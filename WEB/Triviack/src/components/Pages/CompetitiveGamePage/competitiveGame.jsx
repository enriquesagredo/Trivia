import TriviaGameComp from "../../TriviaQuestBase/TriviaQuestComp";
import "../../TriviaQuestBase/TriviaQuest.css"

const CompetitiveGame = () => {


  return (
    <div>
      <h1 className="card-title header-text">Competitive Game</h1>
      <TriviaGameComp mode="music" onQuestionsLoaded={(questions) => console.log('Preguntas cargadas:', questions)} />
    </div>
    
  );
};

export default CompetitiveGame;