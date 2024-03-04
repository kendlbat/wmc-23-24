import React from "react";
import { useState } from "react";

const ClickTracker: React.FC = () => {
    /**
     * Diese Komponente soll die Clicks auf den Button zählen und in `label#timestamps` anzeigen.
     * Das Click-Ereignis soll ebenfalls protokolliert werden.
     * Eingetragen werden soll der Zeitpunkt des Clicks (ISO-Formatiert).
     * Die Timestamps sollen in `textarea#timestamps` dargestellt werden.
     * Der jüngste Timestamp muss immer an erster Stelle stehen.
     *
     * Zusatzaufgabe: Geben Sie zusätzlich zum TimeStamp die Koordinaten des Clicks mit aus.
     */

    const [clicks, setClicks] = useState<
        Array<{
            time: Date;
            pos: {
                x: number;
                y: number;
            };
        }>
    >([]);

    return (
        <React.Fragment>
            <button
                className="btn btn-primary"
                onClick={(e) => {
                    setClicks([
                        {
                            time: new Date(),
                            pos: {
                                x: e.clientX,
                                y: e.clientY,
                            },
                        },
                        ...clicks,
                    ]);
                }}>
                Click me
            </button>
            <div className="form-group">
                <label htmlFor="timestamps">
                    You have clicked the button {clicks.length} times.
                    TimeStamps of click-events listed below - youngest event on
                    top:
                </label>
                <textarea
                    className="form-control"
                    id="timestamps"
                    value={clicks
                        .sort((a, b) => b.time.getTime() - a.time.getTime())
                        .reduce(
                            (acc, curr) =>
                                acc +
                                `${curr.time.toISOString()} - ${curr.pos.x}, ${
                                    curr.pos.y
                                }\n`,
                            ""
                        )}
                    rows={8}></textarea>
            </div>
        </React.Fragment>
    );
};

export default ClickTracker;
