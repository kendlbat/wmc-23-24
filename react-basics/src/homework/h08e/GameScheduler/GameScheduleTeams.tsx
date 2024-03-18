import React from "react";
import Form from "react-bootstrap/Form";

const GameScheduleTeams: React.FC<{
    teams: string[];
    setTeams: (teams: string[]) => void;
}> = ({ teams, setTeams }) => {
    return (
        <div>
            <h2>Teams</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Anzahl Mannschaften</Form.Label>
                    <Form.Control
                        type="number"
                        value={teams.length}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (target.value === "") {
                                setTeams([]);
                                return;
                            }
                            if (
                                parseInt(target.value) < 1 ||
                                parseInt(target.value) > 8
                            ) {
                                return;
                            }
                            if (parseInt(target.value) > teams.length) {
                                setTeams([
                                    ...teams,
                                    ...new Array(
                                        parseInt(target.value) - teams.length
                                    ).fill(""),
                                ]);
                            }
                            if (parseInt(target.value) < teams.length) {
                                setTeams([
                                    ...teams.slice(0, parseInt(target.value)),
                                ]);
                            }
                        }}
                    />
                </Form.Group>
                {teams.map((team, idx) => (
                    <Form.Group key={idx}>
                        <Form.Label>Team {idx + 1}: </Form.Label>
                        <Form.Control
                            name={`team-${idx}`}
                            type="text"
                            min={1}
                            max={8}
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                const newTeams = [...teams];
                                newTeams[idx] = target.value;
                                setTeams(newTeams);
                            }}
                            value={team}
                        />
                    </Form.Group>
                ))}
            </Form>
        </div>
    );
};

export default GameScheduleTeams;
