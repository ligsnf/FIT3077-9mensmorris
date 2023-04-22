import { Piece, PieceColour } from './Piece';

export class Position {
    piece: Piece | undefined;
    neighbours: number[];

    constructor(piece?: Piece) {
        this.piece = piece;
        this.neighbours = [];
    }

    setNeighbours(neighbours: number[]) {
        this.neighbours = neighbours;
    }
}

