import React from "react";
import GameScheduleTeams from "./GameScheduleTeams";
import GameSchedulePairings from "./GameSchedulePairings";

const GameSchedule: React.FC = () => {
    /**
     * Die Komponente soll bei einer gegeben Anzahl von Teams alle Paarungen
     * der Teams darstellen, wenn jedes Team gegen jedes Team spielen soll.
     *
     * Erweitern Sie die Implementierung, sodass im linken Bereich der Komponente
     * die Anzahl der Teams bzw. deren Namen konfiguriert werden können. Es sollten
     * maximal 8 Teams eingegeben werden können. Im rechten Bereich der Komponente
     * sollten alle möglichen Paarungen der einzelnen Teams dargestellt werden.
     *
     */

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-4">
                    <GameScheduleTeams />
                </div>
                <div className="col-8">
                    <GameSchedulePairings />
                </div>
            </div>
        </div>
    );
};

export default GameSchedule;
