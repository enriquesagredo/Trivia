import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import "../TriviaQuestBase/TriviaQuest.css"

const TriviaGame = ({ onQuestionsLoaded }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  TriviaGame.propTypes = {
    onQuestionsLoaded: PropTypes.func.isRequired,
  };

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswers([]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameOver(true);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();

        if (data) {
          setQuestions(data);
          onQuestionsLoaded(data);
          setQuestionsLoaded(true);
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
    if (questionsLoaded) {
      setShuffledAnswers(shuffleAnswers(questions[currentQuestionIndex].incorrectAnswers, questions[currentQuestionIndex].correctAnswer));
    }
  }, [currentQuestionIndex, questions, questionsLoaded]);

  const shuffleAnswers = (incorrectAnswers, correctAnswer) => {
    return [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
  };

  const handleOptionSelect = (selected) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selected === currentQuestion.correctAnswer;

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setIsCorrect(isAnswerCorrect);
    setSelectedOption(selected);

    // Actualizar las respuestas correctas
    setCorrectAnswers([...correctAnswers, currentQuestion.correctAnswer]);

    setTimeout(() => {
      handleNextQuestion();
    }, 4000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!questionsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {currentQuestion && !gameOver && (
        <div className="card text-center bg">
          <div className="card-body">
            <h5 className="card-title">{currentQuestion.question.text}</h5>

            <div className="d-grid gap-2">
              {shuffledAnswers.map((option, index) => (
                <button
                  key={index}
                  className={`btn ${correctAnswers.includes(option) ? 'btn-success' : (selectedOption === option ? 'btn-danger' : 'btn-outline-primary')}`}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameOver && <div>Game Finished! Your Score: {score}</div>}
    </div>
  );
};

export default TriviaGame;