import { Board } from './Board';
import { PieceColour } from './Piece';
import { Player } from './Player';

interface GameState {
    board: Board
    playerWhite: Player;
    playerBlack: Player;
    currentPlayer: Player;
    winner: Player | undefined;
    isGameOver: boolean;
}
export class Game {
    private state: GameState;

    constructor(state?: GameState) {
        if (state) {
            this.state = state
            return
        }

        const playerWhite = new Player('Player White', PieceColour.White);
        const playerBlack = new Player('Player Black', PieceColour.Black);
        const defaultState: GameState = {
            board: new Board(),
            playerWhite: playerWhite,
            playerBlack: playerBlack,
            currentPlayer: playerWhite,
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