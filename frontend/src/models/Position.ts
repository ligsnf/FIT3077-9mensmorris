import { Piece, PieceColour } from './Piece';

export class Position {
    private piece: Piece | undefined;
    private neighbours: number[];
    private isValidMove?: boolean;

    constructor(piece?: Piece) {
        this.piece = piece;
        this.neighbours = [];
    }

    getNeighbours(): number[] {
        return this.neighbours;
    }

    setNeighbours(neighbours: number[]) {
        this.neighbours = neighbours;
    }

    getPiece(): Piece | undefined {
        return this.piece;
    }

    setPiece(piece: Piece | undefined) {
        this.piece = piece;
    }

    getIsValidMove(): boolean | undefined {
        return this.isValidMove;
    }

    setIsValidMove(isValidMove: boolean) {
        this.isValidMove = isValidMove;
    }
}

