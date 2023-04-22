import { Board } from './Board';
import { PieceColour } from './Piece';
import { Player } from './Player';

interface GameState {
    board: Board
    currentPlayer: Player;
    winner: Player | undefined;
    isGameOver: boolean;
}
export class Game {
    private state: GameState;
    playerWhite: Player;
    playerBlack: Player;

    constructor(state?: GameState) {
        this.playerWhite = new Player(PieceColour.White);
        this.playerBlack = new Player(PieceColour.Black);

        if (state) {
            this.state = state
            return
        }

        const defaultState: GameState = {
            board: new Board(),
            currentPlayer: this.playerWhite,
            winner: undefined,
            isGameOver: false,
        }

        this.state = defaultState
    }

    getState(): GameState {
        return this.state;
    }

    getBoard(): Board {
        return this.state.board;
    }

    getCurrentPlayer(): Player {
        return this.state.currentPlayer;
    }

    setCurrentPlayer(player: Player) {
        this.state.currentPlayer = player;
    }

}