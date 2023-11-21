import TriviaGameCat from "../../TriviaQuestBase/TriviaQuestCat";
import "../../TriviaQuestBase/TriviaQuest.css"

const CategoryGame = () => {


  return (
    <div>
      <h1 className="card-title header-text">Category Game</h1>
      <TriviaGameCat mode="music" onQuestionsLoaded={(questions) => console.log('Preguntas cargadas:', questions)} />
    </div>
    
  );
};

export default CategoryGame;