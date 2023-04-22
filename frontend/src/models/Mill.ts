import { Position } from './Position';
import { Player } from './Player';

export class Mill {
    private positions: Position[];
    private player: Player;

    constructor(positions: Position[], player: Player) {
        this.positions = positions;
        this.player = player;
    }

    getPositions(): Position[] {
        return this.positions;
    }

    getPlayer(): Player {
        return this.player;
    }
}