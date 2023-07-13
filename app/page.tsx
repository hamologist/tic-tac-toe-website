import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        <div className={`${styles.gameSquare} ${styles.top} ${styles.left}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.top}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.top} ${styles.right}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.left}`}>
        </div>
        <div className={`${styles.gameSquare}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.right}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.bottom} ${styles.left}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.bottom}`}>
        </div>
        <div className={`${styles.gameSquare} ${styles.bottom} ${styles.right}`}>
        </div>
      </div>
    </main>
  )
}
