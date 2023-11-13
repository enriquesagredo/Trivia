import { useState, useEffect, useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMusic, faGlobe, faHistory } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TriviaGame = ({ onQuestionsLoaded }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [gameOver, setGameOver] = useState(false);
  
    TriviaGame.propTypes = {
      mode: PropTypes.string.isRequired,
      onQuestionsLoaded: PropTypes.func.isRequired,
    };
  
    const handleNextQuestion = useCallback(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      setTimer(15);
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Fin del juego, muestra la puntuación
        setGameOver(true);
      }
    }, [currentQuestionIndex, questions]);
  
    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            const response = await fetch('https://the-trivia-api.com/v2/questions');
            console.log(response)
            const data = await response.json();
            console.log(data.question)
            console.log(data[0].question)
            // console.log('Questions data:', data);
      
            if (data) {
              setQuestions(data[Math.floor(Math.random()*data.length)].question);
              onQuestionsLoaded(data[Math.floor(Math.random()*data.length)].question);
            } else {
              console.error('No questions found in the API response.');
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        };
      
        fetchQuestions();
      }, [onQuestionsLoaded]);
  
    useEffect(() => {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      return () => clearInterval(timerInterval);
    }, []);
  
    useEffect(() => {
      if (timer === 0 && !selectedOption) {
        // No hay respuesta después de 15 segundos, pasa a la siguiente pregunta
        handleNextQuestion();
      }
    }, [timer, selectedOption, handleNextQuestion]);
  
    const handleOptionSelect = (selected) => {
      if (selected === questions[currentQuestionIndex].correct_answer) {
        setScore((prevScore) => prevScore + timer);
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
  
      setSelectedOption(selected);
  
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    };
  
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
      <div className="container mt-4">
        {currentQuestion && !gameOver && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {/* {categoriesIcons[currentQuestion.category]} */}
                {currentQuestion.question}
              </h5>
             
              <p className="card-text">Time Remaining: {timer} seconds</p>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`form-check ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`option${index}`}
                    name="answer"
                    disabled={selectedOption !== null}
                    onChange={() => handleOptionSelect(option)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      
        {gameOver && <div> {questions.text} Game Over! Your Score: {score}</div>}
      </div>
    );
  };
  
  export default TriviaGame;