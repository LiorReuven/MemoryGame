import React, { useState } from 'react';
import Cards from './components/Cards';

function App() {
  const [tries, setTries] = useState(2);
  const [showGame, setShowGame] = useState(false);

  const [items, setItems] = useState(
    [
      { id: 1, img: '/cardsImages/caveman.png', state: '' },
      { id: 1, img: '/cardsImages/caveman.png', state: '' },
      { id: 2, img: '/cardsImages/donkey.png', state: '' },
      { id: 2, img: '/cardsImages/donkey.png', state: '' },
      { id: 3, img: '/cardsImages/elephant.png', state: '' },
      { id: 3, img: '/cardsImages/elephant.png', state: '' },
      { id: 4, img: '/cardsImages/fish.png', state: '' },
      { id: 4, img: '/cardsImages/fish.png', state: '' },
      { id: 5, img: '/cardsImages/ghost.png', state: '' },
      { id: 5, img: '/cardsImages/ghost.png', state: '' },
      { id: 6, img: '/cardsImages/pig.png', state: '' },
      { id: 6, img: '/cardsImages/pig.png', state: '' },
      { id: 7, img: '/cardsImages/santa.png', state: '' },
      { id: 7, img: '/cardsImages/santa.png', state: '' },
      { id: 8, img: '/cardsImages/turtle.png', state: '' },
      { id: 8, img: '/cardsImages/turtle.png', state: '' },
    ].sort(() => Math.random() - 0.5)
  );

  const restartGame = () => {
    const restart = items
      .map((item) => ({ ...item, state: '' }))
      .sort(() => Math.random() - 0.5);
    setItems([...restart]);
    setTries(10);
  };

  const newGameHandler = () => {
    restartGame();
    setShowGame(true);
  };

  return (
    <div className="App">
      <h1>Lior Reuven's Memory Game</h1>
      {showGame && <h2>Tries: {tries}</h2>}
      <button className="btn" onClick={newGameHandler}>
        {showGame ? 'Restart Game' : 'New Game'}
      </button>
      {showGame && (
        <Cards
          restartGame={restartGame}
          tries={tries}
          setTries={setTries}
          items={items}
          setItems={setItems}
        />
      )}
    </div>
  );
}

export default App;
