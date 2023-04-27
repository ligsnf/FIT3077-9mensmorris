import React from 'react'
import { Piece, PieceColour } from '../models/Piece'

type Props = {
    piece: Piece | undefined
}

const PieceComponent = ({ piece }: Props) => {

    let pieceColour
    if (piece) {
        switch (piece.getColour()) {
            case PieceColour.White:
                pieceColour = 'bg-white'
                break;
            case PieceColour.Black:
                pieceColour = 'bg-black'
                break;
            default:
                break;
        }
    }

    let selectedShadow
    if (piece?.getIsSelected()) {
        selectedShadow = "shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"
    } else {
        selectedShadow = "shadow-[1px_2px_8px_2px_rgba(0,0,0,0.3)]"
    }

    return (
        <div className={`${pieceColour} ${selectedShadow} rounded-full w-8 h-8 group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]`}></div>
    )
}

export default PieceComponent