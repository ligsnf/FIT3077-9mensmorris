import { Piece, PieceColour } from './Piece'
import { Player } from './Player'

interface BoardState {
    positions: (Position | null)[]
    selectedPiece?: Piece
    currentPlayer: Player
    winner?: Player
    isGameOver: boolean
}

export interface Position {
    piece: Piece | undefined
}

export class Board {
    private state: BoardState
    private playerOne = new Player('Player One', PieceColour.White)
    private playerTwo = new Player('Player Two', PieceColour.Black)

    constructor(state?: BoardState) {
        if (state) {
            this.state = state
            return
        }

        const defaultState: BoardState = {
            positions: Array(49).fill(null),
            currentPlayer: this.playerOne,
            isGameOver: false,
        }

        const validPositions = [0, 3, 6, 8, 10, 12, 16, 17, 18, 21, 22, 23, 25, 26, 27, 30, 31, 32, 36, 38, 40, 42, 45, 48]

        for (let i = 0; i < validPositions.length; i++) {
            const index = validPositions[i]
            defaultState.positions[index] = { piece: undefined } as Position
        }

        const neighbours = [[3,21], [0,6,10], [3,27], [10,22], [3,8,12,17], [10,26], [17.23], [10,16,18], [17,25], [0,22,42], [8,21,23,36], [16,22,30], [18,26,32], [12,25,27,40], [6,26,48], [23,31], [30,32,38], [25,31], [22,38], [31,36,40,45], [26,38], [21,45], [38,42,48], [27,45]]

        this.state = defaultState
    }

    // Get the current state of the board
    public getState(): BoardState {
        return this.state
    }

    // Helper method to get the position at a given row and column
    public getPosition(index: number): Position {
        const position = this.state.positions[index]
        if (position === null) {
            throw new Error(`No position found at index ${index}`)
        }
        return position
    }

    // Helper method to get the piece at a given row and column
    private getPiece(index: number): Piece | undefined {
        return this.getPosition(index).piece
    }

    // Set a piece on the board
    setPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (position.piece) {
            throw new Error(`There is already a piece at (${index})`)
        } else {
            position.piece = new Piece(currentPlayer.getColour())
            // Switch to the other player's turn
            const nextPlayer = this.state.currentPlayer.getColour() === this.playerOne.getColour() ? this.playerTwo : this.playerOne
            this.state.currentPlayer = nextPlayer
        }
    }

    // Unset a piece on the board
    unsetPiece(index: number) {
        const position = this.getPosition(index)
        if (!position.piece) {
            throw new Error(`There is no piece at (${index})`)
        } else {
            position.piece = undefined
        }
    }

    // Select a piece on the board
    selectPiece(piece: Piece) {
        this.state.selectedPiece = piece
    }

    // Deselect the currently selected piece
    deselectPiece() {
        this.state.selectedPiece = undefined
    }

    // Move a piece from one spot to another
    movePiece(index: number, toRow: number, toCol: number) {
        const fromPosition = this.getPosition(index)
        const toPosition = this.getPosition(index)

        if (!fromPosition.piece) {
            throw new Error(`There is no piece at (${index})`)
        }

        if (toPosition.piece) {
            throw new Error(`There is already a piece at (${index})`)
        }

        // Update the piece's position
        toPosition.piece = fromPosition.piece
        fromPosition.piece = undefined

        // Check if the move formed a mill and update the state accordingly

        // Switch to the other player's turn
        this.state.currentPlayer = this.state.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne
    }


}
