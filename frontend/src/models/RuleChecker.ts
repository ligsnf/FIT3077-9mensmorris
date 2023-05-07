import { Board } from './Board';
import { PieceColour } from './Piece';

export class RuleChecker {
    private board: Board;
    private millsFormed: { [key: string]: boolean };

    constructor(board: Board = new Board()) {
        this.board = board;
        this.millsFormed = {
            '0-6':  false,
            '0-42': false,
            '6-48': false,
            '42-48':false ,
            '8-12': false,
            '8-36': false,
            '12-40': false,
            '36-40': false,
            '16-18': false,
            '16-30': false,
            '18-32': false,
            '30-32': false,
            '3-17': false,
            '21-23': false,
            '25-27': false,
            '31-45': false,
           }
    }

    getBoard(): Board {
        return this.board ?? new Board();
    }

    checkMillFormed(position: number): PieceColour | undefined {
        for (const key of Object.keys(this.millsFormed)) {
            // key has an output of: '0-6', '0-42', '6-48', ...
            const curMill = this.board.getMill(key);
            if(!this.millsFormed[key] == curMill.isMillFormed()){
                this.millsFormed[key] = curMill.isMillFormed();
                return curMill.getColor();
            }
          }
        return undefined;
    }

}
