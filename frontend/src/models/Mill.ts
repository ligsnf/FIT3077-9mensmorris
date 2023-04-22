import { Position } from './Position';
import { Player } from './Player';

export class Mill {
    private positions: [Position, Position, Position];
    private player?: Player;

    constructor(positions: [Position, Position, Position]) {
        this.positions = positions;
    }

    getPositions(): Position[] {
        return this.positions;
    }

    getPlayer(): Player | undefined {
        return this.player;
    }

    isMillFormed(): boolean {
        const [a, b, c] = this.positions;
        const pieceA = a.getPiece();
        const pieceB = b.getPiece();
        const pieceC = c.getPiece();

        if (pieceA?.getColour() === pieceB?.getColour() && pieceB?.getColour() === pieceC?.getColour() && pieceA?.getColour() && pieceA) {
            this.player = new Player(pieceA.getColour());
            return true;
        }

        return false;
    }
}