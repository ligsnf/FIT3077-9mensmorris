import { Position } from './Position';
import { PieceColour } from './Piece';

export class Mill {
    private positions: [Position, Position, Position];
    private colour?: PieceColour;

    constructor(positions: [Position, Position, Position]) {
        this.positions = positions;
    }

    getPositions(): Position[] {
        return this.positions;
    }

    getColor(): PieceColour | undefined {
        return this.colour;
    }

    isMillFormed(): boolean {
        const [a, b, c] = this.positions;
        const pieceA = a.getPiece();
        const pieceB = b.getPiece();
        const pieceC = c.getPiece();

        if (pieceA?.getColour() === pieceB?.getColour() && pieceB?.getColour() === pieceC?.getColour() && pieceA?.getColour() && pieceA) {
            this.colour = pieceA.getColour();
            return true;
        }

        return false;
    }
}