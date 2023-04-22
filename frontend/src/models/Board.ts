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

        const validPositions = [0, 3, 6, 8, 10, 12, 16, 17, 18, 21, 22, 23, 25, 26, 27, 30, 31, 32, 36, 38, 40, 42, 45, 48]
        const neighbours = [[3,21], [0,6,10], [3,27], [10,22], [3,8,12,17], [10,26], [17.23], [10,16,18], [17,25], [0,22,42], [8,21,23,36], [16,22,30], [18,26,32], [12,25,27,40], [6,26,48], [23,31], [30,32,38], [25,31], [22,38], [31,36,40,45], [26,38], [21,45], [38,42,48], [27,45]]

        for (let i = 0; i < validPositions.length; i++) {
            const index = validPositions[i]
            this.positions[index] = new Position()
            this.positions[index]?.setNeighbours(neighbours[i])
        }

        this.mills = {
            '0-6': new Mill([this.getPosition(0), this.getPosition(3), this.getPosition(6)]),
            '0-42': new Mill([this.getPosition(0), this.getPosition(21), this.getPosition(42)]),
            '6-48': new Mill([this.getPosition(6), this.getPosition(27), this.getPosition(48)]),
            '42-48': new Mill([this.getPosition(42), this.getPosition(45), this.getPosition(48)]),
            '8-12': new Mill([this.getPosition(8), this.getPosition(10), this.getPosition(12)]),
            '8-36': new Mill([this.getPosition(8), this.getPosition(22), this.getPosition(36)]),
            '12-40': new Mill([this.getPosition(12), this.getPosition(26), this.getPosition(40)]),
            '36-40': new Mill([this.getPosition(36), this.getPosition(38), this.getPosition(40)]),
            '16-18': new Mill([this.getPosition(16), this.getPosition(17), this.getPosition(18)]),
            '16-30': new Mill([this.getPosition(16), this.getPosition(23), this.getPosition(30)]),
            '18-32': new Mill([this.getPosition(18), this.getPosition(25), this.getPosition(32)]),
            '30-32': new Mill([this.getPosition(30), this.getPosition(31), this.getPosition(32)]),
            '3-17': new Mill([this.getPosition(3), this.getPosition(10), this.getPosition(17)]),
            '21-23': new Mill([this.getPosition(21), this.getPosition(22), this.getPosition(23)]),
            '25-27': new Mill([this.getPosition(25), this.getPosition(26), this.getPosition(27)]),
            '31-45': new Mill([this.getPosition(31), this.getPosition(38), this.getPosition(45)]),
        }
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
        return this.getPosition(index).getPiece()
    }

    // Set a piece on the board
    setPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (position.getPiece()) {
            throw new Error(`There is already a piece at (${index})`)
        } else {
            position.setPiece(new Piece(currentPlayer.getColour()))
        }
    }

    // Unset a piece on the board
    unsetPiece(index: number) {
        const position = this.getPosition(index)
        if (!position.getPiece()) {
            throw new Error(`There is no piece at (${index})`)
        } else {
            position.setPiece(undefined)
        }
    }

    // Get selected piece
    getSelectedPiece(): Piece | undefined {
        return this.selectedPiece
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
