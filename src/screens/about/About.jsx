import { useState } from 'react';
import styles from './About.module.css';

function About({ onBack }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>About This World</h1>
                <p className={styles.text}>
                    I was just getting bored and I thought this might be a cool idea.
                </p>
                <p className={styles.text}>
                    So I just built this to feel alive and
                    <br />
                    built with lots of caffeine for sure.
                </p>



                <div className={styles.signature}>
                    "The site's always under construction, so don't mind the bugs.
                    <br />
                    I need my health bar refilled too. I'll fix them later... maybe."
                </div>

                <button className={styles.backButton} onClick={onBack}>
                    [ Close ]
                </button>
            </div>
        </div>
    );
}

export default About;
