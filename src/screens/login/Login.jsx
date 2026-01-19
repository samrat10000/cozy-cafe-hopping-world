import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

function Login({ onBack, onLoginSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);

        if (result.success) {
            // Success! Logic handled by parent (App.jsx) to switch screens
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } else {
            setError(result.msg);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Cozy Cafe Login</h1>
                <p className={styles.subtitle}>Welcome back, traveler.</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="samrat@cozy.com"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        [ Open Door ]
                    </button>

                    {/* Guest Mode Back Button */}
                    <button type="button" className={styles.guestButton} onClick={onBack}>
                        Just browsing...
                    </button>
                </form>

                <p className={styles.hint}>
                    (Hint: Use <b>samrat@cozy.com</b> / <b>password123</b>)
                </p>
            </div>
        </div>
    );
}

export default Login;
