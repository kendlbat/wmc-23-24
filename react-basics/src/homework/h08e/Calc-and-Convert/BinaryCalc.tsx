import React, { ChangeEventHandler, useState } from "react";
import Form from "react-bootstrap/Form";

const BinaryCalc: React.FC = () => {
    /**
   * Implementieren Sie einen Binärrechner.
   * 
   * Jeder Switch kann on (1) oder off (0) sein. 
   * Jeder Switch steht für den Exponent einer 2er Potenz, beginnend mit 0.
   * Basierend auf der Stellung der Switches soll der entsprechende Dezimalwert im Textfeld angezeigt werden.
   * 
   * Beispiel:
   
   * Switch 6: ON   1 * 2 ^ 5 =   32 
   * Switch 5: OFF  0 * 2 ^ 4 =    0 
   * Switch 4: ON   1 * 2 ^ 3 =    8 
   * Switch 3: ON   1 * 2 ^ 2 =    4 
   * Switch 2: OFF  0 * 2 ^ 1 =    0
   * Switch 1: ON   1 * 2 ^ 0 =    1
   * -------------------------------
   * Dezimalwert:                 45
   * 
   * Es sollte jedoch auch möglich sein den Dezimalwert direkt zu ändern, sodass
   * dann die Switches den entsprechenden Binärwert darstellen.
   * 
   * Die Komponente sollte über ein optionales Property initialValue auch einen
   * initialen Wert erhalten können. Ansonsten ist der initiale Wert 17.
   */

    const [value, setValue] = useState<number>(0);

    const switchHandler: ChangeEventHandler = (e) => {
        const target = e.target as HTMLInputElement;

        const evValue = parseInt(target.name);
        if (isNaN(evValue)) return;

        const evChecked = value % (evValue * 2) >= evValue;

        if (!isNaN(evValue)) setValue(value + evValue * (evChecked ? -1 : 1));
    };

    return (
        <div>
            <Form.Check
                type="switch"
                name="32"
                label="2^5"
                checked={(value >> 5) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Check
                type="switch"
                name="16"
                label="2^4"
                checked={(value >> 4) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Check
                type="switch"
                name="8"
                label="2^3"
                checked={(value >> 3) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Check
                type="switch"
                name="4"
                label="2^2"
                checked={(value >> 2) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Check
                type="switch"
                name="2"
                label="2^1"
                checked={(value >> 1) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Check
                type="switch"
                name="1"
                label="2^0"
                checked={(value >> 0) % 2 == 1}
                onChange={switchHandler}
            />
            <Form.Group>
                <Form.Label>Dezimalwert</Form.Label>
                <Form.Control
                    type="number"
                    min={0}
                    max={63}
                    name="decimalValue"
                    value={value}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const evValue = parseInt(target.value);
                        if (evValue < 0 || evValue > 63) return;
                        if (!isNaN(evValue)) setValue(evValue);
                        else setValue(0);
                    }}
                />
            </Form.Group>
        </div>
    );
};

export default BinaryCalc;
