import TriviaQuest from '../../TriviaQuestBase/TriviaQuest'; 
import "../../TriviaQuestBase/TriviaQuest.css"

const FastGame = () => {


  return (
    <div>
      <h1>Fast Game</h1>
      <TriviaQuest mode="music" onQuestionsLoaded={(questions) => console.log('Preguntas cargadas:', questions)} />
    </div>
    
  );
};

export default FastGame;





