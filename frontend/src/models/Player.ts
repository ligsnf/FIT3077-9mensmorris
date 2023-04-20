import { PieceColour } from './Piece';

export class Player {
    private name: string;
    private colour: PieceColour;
    private piecesLeft: number;

    constructor(name: string, colour: PieceColour) {
        this.name = name;
        this.colour = colour;
        this.piecesLeft = 9;
    }

    getName(): string {
        return this.name;
    }

    getColour(): PieceColour {
        return this.colour;
    }

    getPiecesLeft(): number {
        return this.piecesLeft;
    }
}