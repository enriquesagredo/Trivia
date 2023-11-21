import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import "../TriviaQuestBase/TriviaQuest.css";

// TESTEANDO COMPONENTES FUNCIONALES

const CategorySelection = ({ onSelectCategory }) => {
  const categories = ["Music", "Sport_and_leisure", "Film_and_tv", "Arts_and_literature", "History", "Society_and_culture", "Science", "Geography", "Food_and_drink", "General_knowledge"];

  return (
    <div className="header-container mt-5">
      <h2 className='subheader-text'>Select a Category</h2>
      <div className="buttons-container d-grid">
        {categories.map(category => (
          <button
            key={category}
            className={`btn category-button category-${category}`}
            onClick={() => onSelectCategory(category)}
          >
            {category.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

CategorySelection.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

const TriviaGameCat = ({ selectedCategory, onQuestionsLoaded }) => {
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

  TriviaGameCat.propTypes = {
    selectedCategory: PropTypes.string,
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
    if (selectedCategory) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(`https://the-trivia-api.com/v2/questions?Category=${selectedCategory}`);
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
    }
  }, [onQuestionsLoaded, selectedCategory]);

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
      setScore((prevScore) => prevScore + 2);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }

    setIsCorrect(isAnswerCorrect);
    setSelectedOption(selected);

    setCorrectAnswers([...correctAnswers, currentQuestion.correctAnswer]);

    setTimeout(() => {
      handleNextQuestion();
    }, 4000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!questionsLoaded || !selectedCategory) {
    return <CategorySelection onSelectCategory={(category) => onSelectCategory(category)} />;
  }

  return (
    <div className="container mt-4">
      <div className="score">Score: {score}</div>

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

export default TriviaGameCat;