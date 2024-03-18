import React, { useState } from "react";
import Form from "react-bootstrap/Form";
/**
 * Implementieren Sie einen einfachen Zinsrechner, der basierend auf den Input
 * - Zinsrate (in %)
 * - Kapital
 * - Laufzeit
 * die Gesamtzinsen errechnet.
 */
const InterestCalculator: React.FC = () => {
    const [interestRate, setInterestRate] = useState(5);
    const [capital, setCapital] = useState(1000);
    const [duration, setDuration] = useState(1);

    return (
        <div>
            <Form.Group>
                <Form.Label htmlFor="interestRate">
                    Interest Rate (%):{" "}
                </Form.Label>
                <Form.Control
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const evValue = parseInt(target.value);
                        if (isNaN(evValue)) setInterestRate(0);
                        else setInterestRate(evValue);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="capital">Amount (e.g. 1000): </Form.Label>
                <Form.Control
                    id="capital"
                    type="number"
                    value={capital}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const evValue = parseInt(target.value);
                        if (isNaN(evValue)) setCapital(0);
                        else setCapital(evValue);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="duration">Duration (years): </Form.Label>
                <Form.Control
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const evValue = parseInt(target.value);
                        if (isNaN(evValue)) setDuration(0);
                        else setDuration(evValue);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <h2>
                    Result:{" "}
                    {(
                        capital * Math.pow(1 + interestRate / 100, duration)
                    ).toFixed(2)}
                </h2>
            </Form.Group>
        </div>
    );
};

export default InterestCalculator;
