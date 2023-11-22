import { useEffect, useState } from 'react';
import { getLeaderboardApi } from '../../services/api-service';
import "../leaderboard/leaderboard.css";

const generateRandomUser = () => {
    const randomName = `User${Math.floor(Math.random() * 1000)}`;
    const randomPoints = Math.floor(Math.random() * 100);
    return { username: randomName, points: randomPoints };
};

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getLeaderboardApi().then((data) => {
            console.log(data);
            setLeaderboard(data);
        });
    }, []);

    const generateRandomLeaderboard = () => {
        const randomUsers = Array.from({ length: 10 }, () => generateRandomUser());
        setLeaderboard(randomUsers);
    };

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <ul className="leaderboard-list">
                {leaderboard.length > 0 ? (
                    leaderboard.map((score, index) => (
                        <li key={index} className="leaderboard-item">
                            <span className="leaderboard-username">{score.username}</span>
                            <span className="leaderboard-points">{score.points} points</span>
                        </li>
                    ))
                ) : (
                    <h2>LOADING</h2>
                )}
            </ul>
            <button onClick={generateRandomLeaderboard}>Generate Random Leaderboard</button>
        </div>
    );
};

export default Leaderboard;