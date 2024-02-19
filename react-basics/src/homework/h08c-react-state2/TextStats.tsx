import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const TextStats: React.FC = () => {
    /**
     * Ergänzen Sie die Funktionalität im vorgegebenen Formular,
     * sodass für den eingegebenen Text eine entsprechende
     * Statistik berechnet wird welche die Anzahl der
     * Zeichen, Buchstaben und Wörter des Textes enthält.
     * Die Werte sollen in den dafür vorgesehenen Textfelder angezeigt werden.
     * In den Textfeldern sollte keine Eingabe möglich sein.
     *
     * Verwenden Sie für Ihre Lösung die bereits vorgegebenen Funktionen.
     */

    let [text, setText] = useState("");

    function countWords(text: string): number {
        text = text.trim();
        if (text === "") return 0;
        else return text.split(/\s+/).length;
    }

    function countChars(text: string): number {
        return text.replace(/\s/g, "").length;
    }

    function countLetters(text: string): number {
        return text.replace(/[^A-Za-z]/g, "").length;
    }

    function countNumbers(text: string): number {
        return text.replace(/[^0-9]/g, "").length;
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    onChange={(ev) => {
                        setText(ev.target.value);
                    }}
                    value={text}
                    rows={5}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Wörter</Form.Label>
                <Form.Control
                    value={countWords(text)}
                    type="number"
                    disabled={true}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Zeichen (ohne Leerzeichen)</Form.Label>
                <Form.Control
                    value={countChars(text)}
                    type="number"
                    disabled={true}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Buchstaben</Form.Label>
                <Form.Control
                    value={countLetters(text)}
                    type="number"
                    disabled={true}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Ziffern</Form.Label>
                <Form.Control
                    value={countNumbers(text)}
                    type="number"
                    disabled={true}
                />
            </Form.Group>
        </div>
    );
};

export default TextStats;
