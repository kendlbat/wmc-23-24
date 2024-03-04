export default interface Boat {
    number: number;
    name: string;
    skipper: string;
    cruiser: boolean;
    lengthInM: number;
}

export function isBoat(object: object): object is Boat {
    if (!("number" in object)) return false;
    if (!("name" in object)) return false;
    if (!("skipper" in object)) return false;
    if (!("cruiser" in object)) return false;
    if (!("lengthInM" in object)) return false;

    if (!(typeof object["number"] === "number")) return false;
    if (!(typeof object["name"] === "string")) return false;
    if (!(typeof object["skipper"] === "string")) return false;
    if (!(typeof object["cruiser"] === "boolean")) return false;
    if (!(typeof object["lengthInM"] === "number")) return false;

    return true;
}
