import { PieceColour } from './Piece';

export class Player {
    private colour: PieceColour;
    private piecesLeft: number;
    private piecesTaken: number;
    private piecesOnBoard: number;

    constructor(colour: PieceColour) {
        this.colour = colour;
        this.piecesLeft = 9;
        this.piecesTaken = 0;
        this.piecesOnBoard = 0;
    }

    getMoveType(): string {
        if (this.piecesLeft > 0)
            return "Place";
        else if (this.piecesOnBoard <= 3)
            return "Fly";
        else
            return "Move";
    }

    getColour(): PieceColour {
        return this.colour;
    }

    getPiecesLeft(): number {
        return this.piecesLeft;
    }

    decrementPiecesLeft(): void {
        if (this.piecesLeft - 1 !== -1)
            this.piecesLeft--;
    }

    getPiecesTaken(): number {
        return this.piecesTaken;
    }

    incrementPiecesTaken(): void {
        this.piecesTaken++;
    }

    getPiecesOnBoard(): number {
        return this.piecesOnBoard;
    }

    incrementPiecesOnBoard(): void {
        this.piecesOnBoard++;
    }

    decrementPiecesOnBoard(): void {
        this.piecesOnBoard--;
    }

}