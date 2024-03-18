import React from "react";

const GameSchedulePairings: React.FC<{
    pairings: string[][];
}> = ({ pairings }) => {
    return (
        <div>
            <h2>Paarungen ({pairings.length})</h2>
            <ul>
                {pairings.map((p, idx) => (
                    <li key={idx}>
                        {p[0]}
                        {" vs. "}
                        {p[1]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameSchedulePairings;
