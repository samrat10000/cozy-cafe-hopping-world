// src/screens/home/Home.jsx
import styles from './Home.module.css';
import coffee1 from '../../assets/coffee/coffee1.png';  // No curly braces!

function Home({ onStart }) {
    return (
        <div className={styles.container}>
            {/* Use <img> tag to show the image */}
            <img
                src={coffee1}
                alt="Pixel Coffee"
                className={styles.decoration}
            />

            <h1 className={styles.title}>Cozy Cafe World</h1>
            <p className={styles.subtitle}>
                A quiet place to wander, find good coffee, and rest your mind.
            </p>

            <button className={styles.button} onClick={onStart}>
                Start Wandering
            </button>
        </div>
    );
}

export default Home;