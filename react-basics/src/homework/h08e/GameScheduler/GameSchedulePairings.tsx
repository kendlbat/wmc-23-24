import React from "react";

const GameSchedulePairings: React.FC<{
    pairings: string[][];
}> = ({ pairings }) => {
    return (
        <div>
            <h2>Paarungen</h2>
            <ul>
                {pairings.map((p, idx) => (
                    <li key={idx}></li>
                ))}
            </ul>
        </div>
    );
};

export default GameSchedulePairings;
