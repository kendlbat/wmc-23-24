import React from "react";
import Table from "react-bootstrap/Table";
import Boat from "./model/Boat";
import Boatclass from "./model/Boatclass";

const StartingList: React.FC<{
    boats: Array<Boat>;
    boatClasses: Array<Boatclass>;
}> = ({ boats, boatClasses }) => {
    /*

    Task 1)

    Implementieren Sie eine HTML Tabelle, welche eine Startliste für eine
    Regatta darstellt. Die einzelnen Boote sollen in der Reihenfolge
    wie sie im übergebenen Array _boats_ enthalten sind, dargestellt werden.
    Die Reihenfolge der Spalten und auch die die Kopfzeile können als gegeben
    angenommen werden, d.h. diese müssen nicht dynamisch aus den Daten
    abgeleitet werden.
    
    Task 2)

    Die an der Regatta teilnehmenden Boote werden anhand ihrer Länge in Klassen 
    eingeteilt. Ergänzen Sie die Tabelle mit einer weiteren Spalte, die den Namen
    der Bootsklasse beinhaltet.
    
    Jede Klasse besitzt einen Namen, eine minimale Länge (minLength)
    und eine maximale Länge (maxLength). Ein Boot wird einer Klasse zugeordnet
    wenn minLength <= lengthInM < maxLength gilt. Man kann bei der Implementierung
    davon ausgehen, dass jedes Boot genau einer Klasse zugeordnet werden kann
    und sich die Grenzen der Klassen nicht überschneiden.

    Task 3)

    Implementieren Sie die Anzeige der minimalen bzw. maximalen Bootslänge und der
    Anzahl der startenden Boote in der Fußzeile. Bonuspunkte gibt es für eine
    Implementierung mittels reduce.

    */
    function getBoatClass(len: number): Boatclass | undefined {
        return boatClasses.find(
            (cl) => cl.minLength <= len && len < cl.maxLength
        );
    }

    const minAndMax: { min: number; max: number } = boats.reduce(
        (data, curr) => ({
            min: Math.min(data.min, curr.lengthInM),
            max: Math.max(data.max, curr.lengthInM),
        }),
        { min: Infinity, max: -Infinity }
    );

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Boat</th>
                    <th>Skipper</th>
                    <th>Length</th>
                    <th>Cruiser</th>
                    <th>Class</th>
                </tr>
            </thead>
            <tbody>
                {boats.map((boat, idx) => (
                    <tr key={idx}>
                        <td>{boat.number}</td>
                        <td>{boat.name}</td>
                        <td>{boat.skipper}</td>
                        <td>{boat.lengthInM}</td>
                        <td>{boat.cruiser ? "yes" : "no"}</td>
                        <td>{getBoatClass(boat.lengthInM)?.name || "N/A"}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot className="fw-bold">
                <tr>
                    <td>Total: {boats.length}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                        {minAndMax.min}
                        {" - "}
                        {minAndMax.max}
                    </td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tfoot>
        </Table>
    );
};

export default StartingList;
