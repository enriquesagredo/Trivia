import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import "../TriviaQuestBase/TriviaQuest.css";
import "./categoryselection";

const CategorySelection = ({ onSelectCategory }) => {
  const categories = ["music", "sport_and_leisure", "film_and_tv", "arts_and_literature", "history", "society_and_culture", "science", "geography", "food_and_drink", "general_knowledge"];

  return (
    <div className="header-container mt-5">
      <h2 className='subheader-text'>Select a Category</h2>
      <div className="buttons-container d-grid">
        {categories.map(category => (
          <button
            key={category}
            className={`btn category-button category-${category}`}
            onClick={() => onSelectCategory(category)}
            style={{ textTransform: 'capitalize' }}
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

const TriviaGameCat = ({ onQuestionsLoaded }) => {
  // eslint-disable-next-line no-unused-vars
  const categories = ["music", "sport_and_leisure", "film_and_tv", "arts_and_literature", "history", "society_and_culture", "science", "geography", "food_and_drink", "general_knowledge"];
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);    
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

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
      console.log(selectedCategory);
      const fetchQuestions = async () => {
        try {
          const response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${selectedCategory}`);
          const data = await response.json();
  
          if (data) {
            console.log(data);
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

  return (
    <div>
      {selectedCategory ? (
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

          {gameOver && <div className='subheader-text'> Game Finished! I hope you enjoyed our round of questions by category! </div>}
        </div>
      ) : (
        <CategorySelection onSelectCategory={setSelectedCategory} />
      )}
    </div>
  );
};

export default TriviaGameCat;