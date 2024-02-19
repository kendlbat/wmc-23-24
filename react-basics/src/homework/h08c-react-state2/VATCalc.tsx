import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const VATCalc: React.FC<{
    vatRates?: Array<number>;
}> = ({ vatRates = [0, 10, 20] }) => {
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

    let [selectedVAT, setSelectedVAT] = useState<number>(vatRates[0] || 0);
    let [netPrice, setNetPrice] = useState<number>(0);

    return (
        <div>
            <Form.Group>
                <Form.Label>Netto-Preis</Form.Label>
                <Form.Control
                    value={netPrice}
                    type="number"
                    name="netPrice"
                    onChange={(ev) => {
                        setNetPrice(parseFloat(ev.target.value));
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>USt-Satz</Form.Label>
                <Form.Select
                    value={selectedVAT}
                    aria-label="Default select example"
                    name="vatRate"
                    onChange={(ev) => {
                        setSelectedVAT(parseFloat(ev.target.value));
                    }}>
                    {vatRates.map((rate, idx) => (
                        <option key={idx} value={rate}>
                            {rate} %
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Brutto-Preis</Form.Label>
                <Form.Control
                    value={netPrice * (1 + selectedVAT / 100)}
                    type="number"
                    name="grossPrice"
                    disabled={true}
                />
            </Form.Group>
        </div>
    );
};

export default VATCalc;
