import React, { useState } from "react";
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

    const [teams, setTeams] = useState<Array<string>>(["AUT", "GER", "ITA"]);

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-4">
                    <GameScheduleTeams teams={teams} setTeams={setTeams} />
                </div>
                <div className="col-8">
                    <GameSchedulePairings
                        pairings={teams.flatMap(
                            (v, i): Array<Array<string>> =>
                                teams.slice(i + 1).map((t) => [v, t])
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameSchedule;
