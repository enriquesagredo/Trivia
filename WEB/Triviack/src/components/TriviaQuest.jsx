import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import bgquest from "../media/Triviack media/millor.jpeg"

const TriviaGame = ({ onQuestionsLoaded }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  TriviaGame.propTypes = {
    onQuestionsLoaded: PropTypes.func.isRequired,
  };

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsCorrect(null);

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
        const data = await response.json();

        if (data) {
          setQuestions(data);
          onQuestionsLoaded(data);
        } else {
          console.error('No questions found in the API response.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [onQuestionsLoaded]);

  const handleOptionSelect = (selected) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selected === currentQuestion.correctAnswer;

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setIsCorrect(isAnswerCorrect);
    setSelectedOption(selected);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-4">
      {currentQuestion && !gameOver && (
        <div className="card text-center" style={{ backgroundImage: `url(${bgquest})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
          <div className="card-body">
            <h5 className="card-title">{currentQuestion.question.text}</h5>
            <div className="d-grid gap-2">
              {[...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer].map((option, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-primary ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
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

      {gameOver && <div>Game Over! Your Score: {score}</div>}
    </div>
  );
};

export default TriviaGame;