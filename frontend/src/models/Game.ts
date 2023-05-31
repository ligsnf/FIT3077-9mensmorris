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

export enum GameType {
    Unset = 'unset', // game type hasn't been set yet
    Human = 'human',
    Computer = 'computer',
}
export class Game {
    private state: GameState;
    private gameMode: GameType;

    constructor(gameMode: GameType, state?: GameState) {
        this.gameMode = gameMode;

        if (state) {
            this.state = state
            return
        }

        const playerWhite = new Player(PieceColour.White, true);
        var playerBlack: Player;
        if (this.gameMode == 'human') {
            playerBlack = new Player(PieceColour.Black, true);
        }
        else {
            playerBlack = new Player(PieceColour.Black, false);
        }


        const defaultState: GameState = {
            board: new Board(),
            playerWhite: playerWhite,
            playerBlack: playerBlack,
            currentPlayer: playerWhite,
            winner: undefined,
            isGameOver: false,
        }

        this.state = defaultState
        this.state.board.showValidMoves(this.state.currentPlayer)
    }

    //Getters and Setters
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

    getOtherPlayer(): Player {
        if (this.state.currentPlayer === this.state.playerWhite) {
            return this.state.playerBlack;
        } else {
            return this.state.playerWhite;
        }
    }

    updateCurrentPlayer() {
        this.state.currentPlayer = this.getOtherPlayer();
    }

    getGameMode(): GameType {
        return this.gameMode;
    }

    getPlayerWhite(): Player {
        return this.state.playerWhite;
    }

    getPlayerBlack(): Player {
        return this.state.playerBlack;
    }

    getWinner(): Player | undefined {
        return this.state.winner;
    }

    getIsGameOver(): boolean {
        return this.state.isGameOver;
    }

    getRuleChecker() {
        return this.state.board.getRuleChecker();
    }

    //Check if mill is formed and handle the case
    checkMillFormed() {
        const ruleChecker = this.getRuleChecker();
        if (ruleChecker.checkMillFormed()) {
            this.state.currentPlayer.setMoveType("remove");
        } else {
            this.updateCurrentPlayer();
            this.checkGameOver(this.state.currentPlayer, this.getOtherPlayer());
            if (this.getIsGameOver()) {
                return
            }
            if (!this.state.currentPlayer.getIsHuman()) {
                let index;
                let selectedPiece;
                switch (this.getCurrentPlayer().getMoveType()) {
                    case "place":
                        index = this.getRandom(ruleChecker.getValidPlacements())
                        if (index !== undefined) {
                            this.state.board.placeSelectedPiece(index, this.getCurrentPlayer());
                        }
                        break;
                    case "slide":
                        selectedPiece = this.getRandom(ruleChecker.getValidSlides(this.state.currentPlayer));
                        if (selectedPiece !== undefined) {
                            this.state.board.checkSelectedPiece(selectedPiece[0], this.state.currentPlayer);
                            this.state.board.setSelectedPiece(selectedPiece[0]);
                            index = selectedPiece[1];
                            if (index !== undefined) {
                                this.state.board.moveSelectedPiece(index, this.state.currentPlayer);
                            }
                        }
                        break;
                    case "fly":
                        index = this.getRandom(ruleChecker.getValidPlacements())
                        selectedPiece = this.getRandom(ruleChecker.getValidSelections(this.state.currentPlayer));
                        if (selectedPiece !== undefined) {
                            this.state.board.checkSelectedPiece(selectedPiece, this.state.currentPlayer);
                            this.state.board.setSelectedPiece(selectedPiece);
                            if (index !== undefined) {
                                this.state.board.moveSelectedPiece(index, this.state.currentPlayer);
                            }
                        }
                        break;
                    default:
                        break;
                }
                if (ruleChecker.checkMillFormed()) {
                    const validRemovalIndexes = ruleChecker.getValidRemovals(this.state.currentPlayer);
                    index = this.getRandom(validRemovalIndexes);
                    if (index !== undefined) {
                        this.state.board.removeSelectedPiece(index, this.getCurrentPlayer(), this.getOtherPlayer());
                    }
                }
                this.updateCurrentPlayer();
            }
        }
    }

    // check if game is over and handle the case
    checkGameOver(currentPlayer: Player, otherPlayer: Player): string {
        let winMessage: string = ""
        //Check if any player has run out of pieces
        if (currentPlayer.getPiecesOnBoard() < 3 && currentPlayer.getPiecesLeft() === 0) {
            this.state.winner = otherPlayer;
            this.state.isGameOver = true;
            winMessage = `${currentPlayer.getColour()} has less than 3 pieces left`
        } else if (this.getRuleChecker().getValidMoves(currentPlayer, false).length === 0) {
            //If the current player has no valid moves, the other player wins
            this.state.winner = otherPlayer;
            this.state.isGameOver = true;
            winMessage = `${currentPlayer.getColour()} has no valid moves`
        } else {
            // game continues
        }
        return winMessage
    }

    //Return a random element from an array
    getRandom<T>(array: T[]): T | undefined {
        const filteredArray = array.filter(item => item !== undefined);
        const randomIndex = Math.floor(Math.random() * filteredArray.length);
        return filteredArray[randomIndex];
    }
}