import { useState } from 'react';
import styles from './About.module.css';

function About({ onBack }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>About This World</h1>
                <p className={styles.text}>
                    This is a personal cafe-hopping world I made to feel alive while coding.
                </p>
                <p className={styles.text}>
                    It is not a product. It is a place.
                    <br />
                    A place for quiet thoughts, warm coffee, and gentle friends.
                </p>

                <div className={styles.signature}>
                    — Built with &lt;3
                </div>

                <button className={styles.backButton} onClick={onBack}>
                    [ Close ]
                </button>
            </div>
        </div>
    );
}

export default About;
