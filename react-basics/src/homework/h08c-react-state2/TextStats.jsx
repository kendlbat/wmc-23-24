import React from 'react'
import Form from 'react-bootstrap/Form';


function TextStats() {

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

    function countWords(text) {
        text = text.trim();
        if (text === "") return 0;
        else return text.split(/\s+/).length;
    }

    function countChars(text) {
        return text.replace(/\s/g, "").length
    }

    function countLetters(text) {
        return text.replace(/[^A-Za-z]/g, "").length
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={5} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Wörter</Form.Label>
                <Form.Control type='number' disabled={true} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Zeichen (ohne Leerzeichen)</Form.Label>
                <Form.Control type='number' disabled={true} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Buchstaben</Form.Label>
                <Form.Control type='number' disabled={true} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Ziffern</Form.Label>
                <Form.Control type='number' disabled={true} />
            </Form.Group>

        </div>
    )
}

export default TextStats