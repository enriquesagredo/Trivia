import TriviaQuest from '../../TriviaQuest'; 

const FastGame = () => {
  // Puedes manejar el estado específico de FastGame aquí si es necesario

  return (
    <div>
      <h1>Fast Game</h1>
      {/* Otros elementos de FastGame si los hay */}
      <TriviaQuest mode="music" onQuestionsLoaded={(questions) => console.log('Preguntas cargadas:', questions)} />

      {/* Puedes repetir este bloque para diferentes modos o configuraciones de TriviaGame */}
    </div>
    
  );
};

export default FastGame;





