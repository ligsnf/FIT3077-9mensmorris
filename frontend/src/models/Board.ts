import { Piece, PieceColour } from './Piece'
import { Mill } from './Mill'
import { Position } from './Position'
import { Player } from './Player'
import { RuleChecker } from './RuleChecker'

export class Board {
    private positions: (Position | null)[]
    private mills: { [key: string]: Mill }
    private selectedPiece: number
    private isPieceMoved: boolean
    private validMove: number[]
    private ruleChecker: RuleChecker

    constructor() {
        this.positions = Array(49).fill(null)

        this.ruleChecker = new RuleChecker(this);

        const validPositions = [0, 3, 6, 8, 10, 12, 16, 17, 18, 21, 22, 23, 25, 26, 27, 30, 31, 32, 36, 38, 40, 42, 45, 48]
        const neighbours = [[3, 21], [0, 6, 10], [3, 27], [10, 22], [3, 8, 12, 17], [10, 26], [17, 23], [10, 16, 18], [17, 25], [0, 22, 42], [8, 21, 23, 36], [16, 22, 30], [18, 26, 32], [12, 25, 27, 40], [6, 26, 48], [23, 31], [30, 32, 38], [25, 31], [22, 38], [31, 36, 40, 45], [26, 38], [21, 45], [38, 42, 48], [27, 45]]

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
        this.isPieceMoved = false
        this.selectedPiece = -1
        this.validMove = []
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

    movePiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (this.selectedPiece === index) {
            this.resetCheckMove()
            console.log("Deselect piece")
        }
        else if (!this.validMove.includes(index)) {
            console.log("Please choose the valid move only.")
        }
        else {
            if (!position.getPiece()) {
                //Remove the piece from old position
                this.getPosition(this.getSelectedPiece()).setPiece(undefined)
                //Place the piece in new position
                position.setPiece(new Piece(currentPlayer.getColour()))
                this.isPieceMoved = true
                this.resetCheckMove()
                console.log("Place piece here")
            }
        }
    }

    calculateValidMove(index: number, currentPlayer: Player): boolean {
        const position = this.getPosition(index)
        if (position.getPiece()) {
            if (currentPlayer.getPiecesLeft() == 0 && currentPlayer.getColour() == position.getPiece()?.getColour()) {
                console.log("Calculate the move")
                for (const index of position.getNeighbours()) {
                    if (index !== undefined && this.getPosition(index).getPiece() === undefined) {
                        this.validMove.push(index)
                        this.getPosition(index).setIsValidMove(true)
                    }
                }
                console.log("Finish calculate the move")
                if (this.validMove.length === 0) {
                    // If the loop did not find a valid move, throw an error
                    console.log("No valid move for this piece.")
                }
                else {
                    console.log("There is valid move(s)")
                    return true;
                }
            }
            else {
                console.log(`There is already a piece at (${index})`)
            }
        }
        return false;
    }

    // Select a piece on the board
    checkSelectedPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (position.getPiece()) {
            if (currentPlayer.getColour() == position.getPiece()?.getColour()) {
                if (this.calculateValidMove(index, currentPlayer) == true) {
                    this.setSelectedPiece(index)
                    console.log("Select Piece")
                }
                else {
                    console.log("This piece can't be moved. Please choose different piece!")
                }
            }
            else {
                console.log("Please choose your color piece")
            }
        }
        else {
            console.log(`There is no piece at (${index})`)
        }
    }

    setSelectedPiece(index: number) {
        this.getPiece(index)?.setIsSelected(true)
        this.selectedPiece = index
    }

    unsetSelectedPiece() {
        this.getPiece(this.selectedPiece)?.setIsSelected(false)
        this.selectedPiece = -1
    }

    getSelectedPiece(): number {
        return this.selectedPiece
    }

    getIsPieceMoved(): boolean {
        return this.isPieceMoved
    }
    setIsPieceMoved(isMoved: boolean) {
        this.isPieceMoved = isMoved
    }

    resetCheckMove() {
        this.unsetSelectedPiece()
        for (const index of this.validMove) {
            this.getPosition(index).setIsValidMove(false)
        }
        this.validMove = []
    }

}
