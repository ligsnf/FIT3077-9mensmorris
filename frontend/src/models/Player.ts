import { PieceColour } from './Piece';

export class Player {
    private colour: PieceColour;
    private piecesLeft: number;

    constructor(colour: PieceColour) {
        this.colour = colour;
        this.piecesLeft = 9;
    }

    getColour(): PieceColour {
        return this.colour;
    }

    getPiecesLeft(): number {
        return this.piecesLeft;
    }
}