export enum PieceColour {
    White = 'white',
    Black = 'black',
}

export class Piece {
    private colour: PieceColour;
    private isSelected: boolean;

    constructor(colour: PieceColour) {
        this.colour = colour;
        this.isSelected = false;
    }

    //Getters and Setters
    getColour(): PieceColour {
        return this.colour;
    }

    getIsSelected(): boolean {
        return this.isSelected;
    }

    setIsSelected(isSelected: boolean) {
        this.isSelected = isSelected;
    }
}
