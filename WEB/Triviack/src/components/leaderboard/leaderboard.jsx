// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { getLeaderboardApi } from '../../services/api-service';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        
        getLeaderboardApi().then((data) => {
            console.log (data)
            setLeaderboard(data);
        });
    }, []);
console.log (leaderboard)
    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.length > 0 ? (
                    leaderboard.map((score, index) => (
                        <li key={index}>
                            <span>{score.username}</span>
                            <span>{score.points} points</span>
                        </li>
                    ))
                ) : (
                    <h2>LOADING</h2>
                )}
            </ul>
        </div>
    );
};

export default Leaderboard;