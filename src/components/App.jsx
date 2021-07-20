import React, { useCallback, useEffect, useReducer } from 'react';

import TicTacToe from './TicTacToe';

import TTTComPlay from '../tttcomplay';

import { game, tttInitState, tttReducer } from '../reducers';
import { makeMove, resetGame } from '../actions';

import { TicTacToeStore } from '../contexts';

import styles from './App.module.css';

const App = () => {
  const [state, dispatch] = useReducer(tttReducer, tttInitState);

  const resetClick = useCallback(() => dispatch(resetGame()), [dispatch]);

  useEffect(() => {
    if (state.winner === 0 && state.nextPlayer === 2) {
      dispatch(makeMove.apply(game, TTTComPlay(game)));
    }
  });

  let message = 'play! :) OR DIEEEEEEE';

  if (state.winner > 0) {
    message = 'Player ' + state.winner + ' has won the game!';
  } else if (state.winner === -1) {
    message = 'maybe you are not that bad since u didnt lose';
  }

  return (
    <>
      <TicTacToeStore.Provider value={dispatch}>
        <TicTacToe columns={state.board} />
      </TicTacToeStore.Provider>
      <div className={styles.message}>{message}</div>
      <button className={styles.btn} onClick={resetClick}>
        IM BAD I KNOW
      </button>
      <div className={styles.github}>
        
       
      </div>
    </>
  );
};

App.displayName = 'App';

export default App;
