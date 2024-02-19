import React from 'react'
import Form from 'react-bootstrap/Form';


function VATCalc() {
    /**
     * 
     * Implementieren Sie einen Rechner für den Brutto-Preis
     * Dazu sollte ein Netto-Preis eingegeben und
     * ein USt-Satz ausgewählt werden können. Das Ergebnis
     * sollte im Textfeld grossPrice ausgegeben werden.
     * 
     * Zusatzaufgabe:
     * 
     * Erweitern Sie die Komponente, sodass die USt-Sätze nicht 
     * hardcodiert sind, sondern optional über ein Property
     * vatRates konfiguriert werden können.
     * Der Aufruf der Komponente sollte dann wie folgt gestaltet sein:
     * <VATCalc vatRates={[0, 6.5, 20, 33]} />
     */

    return (
        <div>
            <Form.Group>
                <Form.Label>Netto-Preis</Form.Label>
                <Form.Control type='number' name='netPrice' />
            </Form.Group>
            <Form.Group>
                <Form.Label>USt-Satz</Form.Label>
                <Form.Select aria-label="Default select example" name='vatRate' >
                    <option value="0">0 %</option>
                    <option value="10">10 %</option>
                    <option value="20">20 %</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Brutto-Preis</Form.Label>
                <Form.Control type='number' name='grossPrice' disabled={true} />
            </Form.Group>
        </div>
    )
}

export default VATCalc