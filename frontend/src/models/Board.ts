import { Piece, PieceColour } from './Piece'
import { Mill } from './Mill'
import { Position } from './Position'
import { Player } from './Player'

export class Board {
    private positions: (Position | null)[]
    private mills: { [key: string]: Mill }
    private selectedPiece?: Piece

    constructor() {
        this.positions = Array(49).fill(null)
        this.mills = {}

        const validPositions = [0, 3, 6, 8, 10, 12, 16, 17, 18, 21, 22, 23, 25, 26, 27, 30, 31, 32, 36, 38, 40, 42, 45, 48]

        for (let i = 0; i < validPositions.length; i++) {
            const index = validPositions[i]
            this.positions[index] = new Position()
        }

        const neighbours = [[3,21], [0,6,10], [3,27], [10,22], [3,8,12,17], [10,26], [17.23], [10,16,18], [17,25], [0,22,42], [8,21,23,36], [16,22,30], [18,26,32], [12,25,27,40], [6,26,48], [23,31], [30,32,38], [25,31], [22,38], [31,36,40,45], [26,38], [21,45], [38,42,48], [27,45]]

    }

    // Helper method to get positions
    public getPositions(): (Position | null)[] {
        return this.positions
    }

    // Helper method to get the position at a given row and column
    public getPosition(index: number): Position {
        const position = this.positions[index]
        if (position === null) {
            throw new Error(`No position found at index ${index}`)
        }
        return position
    }

    // Helper method to get the mill from a key
    public getMill(key: string): Mill {
        return this.mills[key]
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
        this.selectedPiece = piece
    }

    // Deselect the currently selected piece
    deselectPiece() {
        this.selectedPiece = undefined
    }

}
