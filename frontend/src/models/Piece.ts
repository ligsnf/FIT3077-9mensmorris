import { Position } from "./Board";

export enum PieceColour {
    White = 'white',
    Black = 'black',
}

export class Piece {
    private colour: PieceColour;

    constructor(colour: PieceColour) {
        this.colour = colour;
    }

    getColour(): PieceColour {
        return this.colour;
    }
}
