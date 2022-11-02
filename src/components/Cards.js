import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';

const Cards = ({ items, setItems, tries, setTries, restartGame }) => {
  const [prev, setPrev] = useState(-1);

  useEffect(() => {
    //LOSE CHECK

    (async () => {
      if (tries === 0) {
        await wait(0.5);
        const answer = window.confirm('you LOST, Restart the game?');
        if (answer) {
          restartGame();
          setPrev(-1);
        } else {
          setTries('You Lost');
        }
      }
    })();
  }, [tries, restartGame, setTries]);

  function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  const correctGuess = (index) => {
    items[index].state = 'correct';
    items[prev].state = 'correct';
    setItems([...items]);
    setPrev(-1);
  };

  const wrongGuess = async (index) => {
    items[index].state = 'wrong';
    items[prev].state = 'wrong';
    setItems([...items]);
    await wait(1);
    items[index].state = '';
    items[prev].state = '';
    setItems([...items]);
    setPrev(-1);
    setTries((prevTries) => {
      if (typeof prevTries === 'number') {
        return prevTries - 1;
      } else if (typeof prevTries === 'string') {
        return prevTries;
      }
    });
  };

  const check = async(index) => {
    if (index === prev) {
      return;
    } else if (items[index].id === items[prev].id) {
      correctGuess(index);
      const result = items.every((item) => item.state === 'correct');
      if (result) {
        await wait(0.5)
        const answer = window.confirm('you WON, Restart the game?');
        if (answer) {
          restartGame();
          setPrev(-1);
        } else {
          return;
        }
      }
    } else {
      wrongGuess(index);
    }
  };

  const clickHandler = (index) => {
    if (prev === -1 && items[index].state !== 'correct') {
      items[index].state = 'active';
      setItems([...items]);
      setPrev(index);
    } else {
      if (items.filter((card) => card.state === 'wrong').length > 1) {
        return;
      } else {
        check(index);
      }
    }
  };

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card
          key={index}
          img={item.img}
          index={index}
          clickHandler={clickHandler}
          state={item.state}
        />
      ))}
    </div>
  );
};

export default Cards;
