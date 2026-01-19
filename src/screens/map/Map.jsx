// src/screens/map/Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import catBread from '../../assets/catbread-marker.png';
import styles from './Map.module.css';
import { cafes } from '../../data/cafes';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import FriendsModal from '../friends/FriendsModal';

// Fix for default marker icon issues in React-Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const myIcon = new Icon({
    iconUrl: catBread,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

function Map({ onCafeSelect, onProfile }) {
    const { user } = useAuth();
    // Tapovan, Rishikesh
    const startPosition = [30.1245, 78.3250];

    const [friendActivity, setFriendActivity] = useState([]);
    const [myVisits, setMyVisits] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch friend visits
            fetch(`http://localhost:5000/api/visits/friends/${user._id}`)
                .then(res => res.json())
                .then(data => setFriendActivity(data))
                .catch(err => console.error("Error fetching friend visits:", err));

            // Fetch my own visits (to mark as visited)
            fetch(`http://localhost:5000/api/visits/${user._id}`)
                .then(res => res.json())
                .then(data => setMyVisits(data))
                .catch(err => console.error("Error fetching my visits:", err));
        }
    }, [user]);

    // Helper to see if a friend is at a cafe
    const getFriendAtCafe = (cafeId) => {
        return friendActivity.find(a => a.cafeId === cafeId);
    };

    const isVisited = (cafeId) => {
        return myVisits.some(v => v.cafeId === cafeId);
    };

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapFrame}>
                <MapContainer center={startPosition} zoom={15} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; Google Maps'
                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    />

                    {cafes.map(cafe => {
                        const friendHere = getFriendAtCafe(cafe.id);
                        const visited = isVisited(cafe.id);

                        return (
                            <Marker key={cafe.id} position={cafe.coordinates} icon={myIcon}>
                                <Popup className={styles.popup}>
                                    <div className={styles.popupHeader}>
                                        <h3 className={styles.popupTitle}>{cafe.name}</h3>
                                        {visited && <span className={styles.sparkle} title="You've been here!">*</span>}
                                    </div>

                                    {friendHere && (
                                        <div className={styles.friendPresence}>
                                            <img
                                                src={`/images/${friendHere.friendAvatar}`}
                                                alt={friendHere.friendName}
                                                className={styles.miniAvatar}
                                            />
                                            <p>{friendHere.friendName} was here!</p>
                                        </div>
                                    )}
                                    <button className={styles.enterButton} onClick={() => onCafeSelect(cafe.id)}>
                                        Enter Cafe &gt;&gt;
                                    </button>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>

                <button
                    className={styles.friendsButton}
                    onClick={onProfile}
                >
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src="/images/avatar-samrat.png" style={{ width: '30px', borderRadius: '50%' }} />
                            My Profile
                        </div>
                    ) : (
                        "[ Me & Friends ]"
                    )}
                </button>
            </div>

            <p className={styles.mapLabel}>Tapovan Cafés</p>
        </div>
    );
}

export default Map;