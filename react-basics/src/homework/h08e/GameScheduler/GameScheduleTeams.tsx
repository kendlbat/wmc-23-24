import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const GameScheduleTeams: React.FC = () => {
    const [teams, setTeams] = useState(["AUT", "GER", "ITA"]);

    return (
        <div>
            <h2>Teams</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Anzahl Mannschaften</Form.Label>
                    <Form.Control type="number" value={teams.length} />
                </Form.Group>
                {teams.map((team, idx) => (
                    <Form.Group key={idx}>
                        <Form.Label>Team {idx + 1}: </Form.Label>
                        <Form.Control
                            name={`team-${idx}`}
                            type="text"
                            value={team}
                        />
                    </Form.Group>
                ))}
            </Form>
        </div>
    );
};

export default GameScheduleTeams;
