"use client";
import { useEffect, useState } from 'react';
import Board from '../game/board';
import useGameManager from '../game/websocket/use-game-manager';
import styles from './page.module.css';

export default function Home() {
  const gameManager = useGameManager();
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if (gameManager.user === null) {
      setShowModal(true);
    }
  }, [gameManager.user])

  return (
    <main className={styles.main}>
      { showModal && 
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close}>&times;</span>
            <label className={styles.label}>Display Name:</label>
            <input
              value={displayName}
              type="text"
              onChange={(event) => {
                setDisplayName(event.target.value);
              }}
            /><br />
            <div className={styles.submitContainer}>
              <button onClick={() => {
                if (displayName.length === 0) {
                  return;
                }

                gameManager.createNewPlayer(displayName);
                setShowModal(false);
              }}>Submit</button>
            </div>
          </div>
        </div>
      }
      <Board gameManager={gameManager}/>
    </main>
  )
}
