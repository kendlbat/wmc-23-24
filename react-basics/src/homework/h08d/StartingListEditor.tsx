import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import StartingList from "./StartingList";
import { BOATS, BOATCLASSES } from "./data/StartingList-data";
import Boat from "./model/Boat";

function StartingListEditor() {
    /**
     * Erstellen Sie basierend auf der vorgegebenen Struktur eine Möglichkeit,
     * Boote zur Startliste hinzuzufügen. Dabei soll die StartingList
     * Komponente aus dem ersten Tasks wiederverwendet werden.
     *
     * Ergänzen Sie die enstprechenden Code-Fragmente, um ein Hinzufügen von
     * neuen Booten zu ermöglichen. Dabei sollte die Startnummer automatisch
     * vergeben werden. Eine Validierung der Eingabe ist nicht erforderlich.
     *
     */

    const [registeredBoats, setRegisteredBoats] = useState<Array<Boat>>(BOATS);

    return (
        <div className="container fluid">
            <div className="row">
                <div className="col-4">
                    <div className="m-3">
                        <RegistrationForm
                            addBoat={(boat) =>
                                setRegisteredBoats([
                                    ...registeredBoats,
                                    {
                                        ...boat,
                                        number:
                                            Math.max(
                                                ...registeredBoats.map(
                                                    (b) => b.number
                                                )
                                            ) + 1,
                                    },
                                ])
                            }></RegistrationForm>
                    </div>
                </div>
                <div className="col-8">
                    <div className="m-3">
                        <StartingList
                            boats={registeredBoats}
                            boatClasses={BOATCLASSES}></StartingList>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartingListEditor;
