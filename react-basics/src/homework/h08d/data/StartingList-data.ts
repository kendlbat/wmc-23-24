import Boatclass from "../model/Boatclass";
import Boat from "../model/Boat";

const BOATCLASSES: Array<Boatclass> = [
    {
        name: "Mega Yacht",
        minLength: 24,
        maxLength: 60,
    },
    {
        name: "Super Maxi",
        minLength: 19,
        maxLength: 24,
    },
    {
        name: "Maxi",
        minLength: 16,
        maxLength: 19,
    },
];

const BOATS: Array<Boat> = [
    {
        number: 1,
        name: "Deep Blue",
        skipper: "Wendy Schmidt",
        cruiser: false,
        lengthInM: 26,
    },
    {
        number: 2,
        name: "Portopiccolo",
        skipper: "Claudio Demartis",
        cruiser: false,
        lengthInM: 27.43,
    },
    {
        number: 3,
        name: "Woodpecker",
        skipper: "Alberto Rossi",
        cruiser: true,
        lengthInM: 27.7,
    },
    {
        number: 4,
        name: "Adriatic Europa",
        skipper: "Dusan Puh",
        cruiser: false,
        lengthInM: 18.98,
    },
    {
        number: 5,
        name: "CleanSport One",
        skipper: "Maurizio Botazzi",
        cruiser: false,
        lengthInM: 19.42,
    },
];

export { BOATCLASSES, BOATS };
