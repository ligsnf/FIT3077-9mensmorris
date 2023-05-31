import { PieceColour } from './Piece';

export class Player {
    private colour: PieceColour;
    private piecesLeft: number;
    private piecesTaken: number;
    private piecesOnBoard: number;
    private isHuman: Boolean;
    private moveType?: string;

    constructor(colour: PieceColour, isHuman: Boolean) {
        this.colour = colour;
        this.piecesLeft = 9;
        this.piecesTaken = 0;
        this.piecesOnBoard = 0;
        this.isHuman = isHuman;
    }

    getMoveType(): string {
        if (this.moveType)
            return this.moveType;
        else

        if (this.piecesLeft > 0)
            return "place";
        else if (this.piecesOnBoard <= 3)
            return "fly";
        else
            return "slide";
    }

    setMoveType(moveType: string) {
        this.moveType = moveType;
    }

    unsetMoveType() {
        this.moveType = undefined;
    }

    getColour(): PieceColour {
        return this.colour;
    }

    getPiecesLeft(): number {
        return this.piecesLeft;
    }

    getIsHuman(): Boolean{
        return this.isHuman
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