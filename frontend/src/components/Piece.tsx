import React from 'react'
import { Piece, PieceColour } from '../models/Piece'

type Props = {
    colour: PieceColour | undefined
}

const PieceComponent = ({ colour }: Props) => {

    let pieceColour
    if (colour) {
        switch (colour) {
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

    return (
        <div className={`${pieceColour} rounded-full w-8 h-8 shadow-[1px_2px_8px_2px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]`}></div>
    )
}

export default PieceComponent