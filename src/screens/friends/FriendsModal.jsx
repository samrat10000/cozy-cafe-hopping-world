import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Friends.module.css';

function FriendsModal({ onClose }) {
    const { user } = useAuth();
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState('my-circle'); // 'my-circle' or 'find'

    // Fetch Friends on Load
    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_API_URL}/api/friends/${user._id}`)
                .then(res => res.json())
                .then(data => setFriends(data))
                .catch(err => console.error("Failed to load friends", err));
        }
    }, [user]);

    // Search for new friends
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/friends/search?name=${searchQuery}`);
            const data = await res.json();
            // Filter out self and existing friends
            const filtered = data.filter(u => u._id !== user._id && !friends.some(f => f._id === u._id));
            setSearchResults(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    // Add a friend
    const handleAddFriend = async (friendId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/friends/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, friendId })
            });
            await res.json();

            // Refresh local list
            const resFriends = await fetch(`${import.meta.env.VITE_API_URL}/api/friends/${user._id}`);
            const data = await resFriends.json();
            setFriends(data);

            // Remove from search results
            setSearchResults(prev => prev.filter(u => u._id !== friendId));
            alert("Friend Added!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <h2 className={styles.title}>Travel Companions</h2>

                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'my-circle' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('my-circle')}
                    >
                        My Circle
                    </button>
                    <button
                        className={activeTab === 'find' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('find')}
                    >
                        Find Others
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'my-circle' ? (
                        <ul className={styles.list}>
                            {friends.map(friend => (
                                <li key={friend._id} className={styles.listItem}>
                                    <span className={styles.avatar}>[ ]</span>
                                    <span className={styles.name}>{friend.name}</span>
                                </li>
                            ))}
                            {friends.length === 0 && <p className={styles.emptyState}>It's quiet here...</p>}
                        </ul>
                    ) : (
                        <div className={styles.searchSection}>
                            <form onSubmit={handleSearch} className={styles.searchForm}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name..."
                                    className={styles.searchInput}
                                />
                                <button type="submit" className={styles.searchButton}>[ &gt;&gt; ]</button>
                            </form>
                            <ul className={styles.list}>
                                {searchResults.map(result => (
                                    <li key={result._id} className={styles.listItem}>
                                        <span className={styles.name}>{result.name}</span>
                                        <button
                                            className={styles.addButton}
                                            onClick={() => handleAddFriend(result._id)}
                                        >
                                            Add +
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FriendsModal;
