import { Board } from './Board';
import { PieceColour } from './Piece';
import { Player } from './Player';

export class Game {
    private board: Board;
    private playerOne: Player;
    private playerTwo: Player;
    private currentPlayer: Player;
    private winner: Player | undefined;
    private isGameOver: boolean;

    constructor() {
        this.board = new Board();
        this.playerOne = new Player('Player One', PieceColour.White);
        this.playerTwo = new Player('Player Two', PieceColour.Black);
        this.currentPlayer = this.playerOne;
        this.isGameOver = false;
    }

}