import { Piece, PieceColour } from './Piece';

export class Position {
    private piece: Piece | undefined;
    private neighbours: number[];
    private isValidMove?: boolean;

    constructor(piece?: Piece) {
        this.piece = piece;
        this.neighbours = [];
    }

    //Getters and Setters
    getNeighbours(): number[] {
        return this.neighbours;
    }

    setNeighbours(neighbours: number[]) {
        this.neighbours = neighbours;
    }

    getPiece(): Piece | undefined {
        return this.piece;
    }

    setPiece(piece: Piece) {
        this.piece = piece;
    }

    unsetPiece() {
        this.piece = undefined;
    }

    getIsValidMove(): boolean | undefined {
        return this.isValidMove;
    }

    setIsValidMove(isValidMove: boolean) {
        this.isValidMove = isValidMove;
    }
}

