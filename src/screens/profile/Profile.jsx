import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Profile.module.css';
import FriendsModal from '../friends/FriendsModal';

function Profile({ onBack, onLogout, onAbout }) {
    const { user, logout } = useAuth();
    const [friends, setFriends] = useState([]);
    const [showFriendSearch, setShowFriendSearch] = useState(false);

    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_API_URL}/api/friends/${user._id}`)
                .then(res => res.json())
                .then(data => setFriends(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        onLogout();
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={onBack}>
                &lt;- Back
            </button>

            <div className={styles.card}>
                <div className={styles.leftCol}>
                    <div className={styles.avatar}>
                        <img src="/images/avatar-samrat.png" alt="Myself" style={{ width: '100%', borderRadius: '50%' }} />
                    </div>
                    <h1 className={styles.name}>{user?.name}</h1>
                    <p className={styles.email}>{user?.email}</p>
                    <div className={styles.divider}></div>
                    <button className={styles.aboutButton} onClick={onAbout}>
                        About World
                    </button>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        [ Logout ]
                    </button>
                </div>

                <div className={styles.rightCol}>
                    <h2 className={styles.sectionTitle}>Travel Companions</h2>
                    <ul className={styles.friendList}>
                        {friends.map(f => (
                            <li key={f._id} className={styles.friendItem}>
                                <img
                                    src={f.name === 'Akash' ? "/images/avatar-akash.png" : "/images/avatar-bhavya.png"}
                                    className={styles.friendAvatarImg}
                                    alt={f.name}
                                />
                                {f.name}
                            </li>
                        ))}
                    </ul>
                    <button
                        className={styles.addFriendButton}
                        onClick={() => setShowFriendSearch(true)}
                    >
                        + Add Friend
                    </button>
                </div>
            </div>

            {showFriendSearch && <FriendsModal onClose={() => setShowFriendSearch(false)} />}
        </div>
    );
}

export default Profile;
