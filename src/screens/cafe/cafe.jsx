// src/screens/cafe/Cafe.jsx
import styles from './Cafe.module.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const getVibeColor = (type) => {
    if (type.includes("River") || type.includes("Ganga")) return "linear-gradient(180deg, #E0F7FA 0%, #E6DCCF 100%)";
    if (type.includes("Treehouse") || type.includes("Organic")) return "linear-gradient(180deg, #F1F8E9 0%, #E6DCCF 100%)";
    if (type.includes("Retro") || type.includes("Bakery")) return "linear-gradient(180deg, #FFF8E1 0%, #E6DCCF 100%)";
    return "linear-gradient(180deg, #FDF6E3 0%, #E6DCCF 100%)";
};

function Cafe({ cafe, onBack }) {
    const { user } = useAuth();
    const [collected, setCollected] = useState(false);
    const [activeTab, setActiveTab] = useState('menu'); // 'menu', 'reviews', 'write'
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState("");
    const [newReviewFeeling, setNewReviewFeeling] = useState("Cozy");

    // Visit Trigger
    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_API_URL}/api/visits/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, cafeId: cafe.id })
            }).catch(err => console.error("Visit log error", err));
        }
    }, [user, cafe.id]);

    // Fetch Reviews when entering
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${cafe.id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, [cafe.id]);

    const handleCollect = () => {
        setCollected(true);
        // In real app, save to backend: /api/users/collect
    };

    const handlePostReview = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    cafeId: cafe.id,
                    text: newReviewText,
                    feeling: newReviewFeeling
                })
            });
            const savedReview = await res.json();

            // Add to local list and reset
            setReviews([savedReview, ...reviews]);
            setNewReviewText("");
            setActiveTab('reviews');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className={styles.container}
            style={{ background: getVibeColor(cafe.type) }}
        >
            <nav className={styles.nav}>
                <button className={styles.backButton} onClick={onBack}>
                    ← Leave
                </button>
            </nav>

            <main className={styles.card}>
                <h1 className={styles.name}>{cafe.name}</h1>
                <div className={styles.badge}>{cafe.vibe}</div>

                {/* TABS */}
                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'menu' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('menu')}
                    >
                        Popular Menu
                    </button>
                    <button
                        className={activeTab === 'reviews' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                    <button
                        className={activeTab === 'write' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('write')}
                    >
                        Write Note
                    </button>
                </div>

                <div className={styles.contentArea}>
                    {/* MENU TAB */}
                    {activeTab === 'menu' && (
                        <div className={styles.menuSection}>
                            <ul className={styles.menuList}>
                                {cafe.menu.map((item, index) => (
                                    <li key={index} className={styles.menuItem}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* REVIEWS TAB */}
                    {activeTab === 'reviews' && (
                        <div className={styles.reviewsList}>
                            {reviews.length === 0 ? (
                                <p className={styles.emptyState}>No notes left here yet...</p>
                            ) : (
                                reviews.map(rev => (
                                    <div key={rev._id} className={styles.reviewCard}>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.reviewUser}>{rev.user ? rev.user.name : "Traveler"}</span>
                                            <span className={styles.reviewFeeling}>{rev.feeling}</span>
                                        </div>
                                        <p className={styles.reviewText}>{rev.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* WRITE TAB */}
                    {activeTab === 'write' && (
                        <form onSubmit={handlePostReview} className={styles.writeForm}>
                            <textarea
                                value={newReviewText}
                                onChange={e => setNewReviewText(e.target.value)}
                                placeholder="How does this place make you feel?"
                                className={styles.textArea}
                                required
                            />
                            <select
                                value={newReviewFeeling}
                                onChange={e => setNewReviewFeeling(e.target.value)}
                                className={styles.feelingSelect}
                            >
                                <option value="Cozy">Cozy</option>
                                <option value="Inspired">Inspired</option>
                                <option value="Calm">Calm</option>
                                <option value="Social">Social</option>
                            </select>
                            <button type="submit" className={styles.postButton}>[ Post Note ]</button>
                        </form>
                    )}
                </div>

                {/* <button
                    className={`${styles.stickerButton} ${collected ? styles.collected : ''}`}
                    onClick={handleCollect}
                    disabled={collected}
                    style={{ marginTop: '20px' }}
                >
                    {collected ? "Sticker Collected! ✨" : "Collect Sticker 🎫"}
                </button> */}
            </main>
        </div>
    );
}

export default Cafe;