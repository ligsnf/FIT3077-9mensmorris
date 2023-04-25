import React from 'react'
import { Player } from "../models/Player";

type Props = {
    player: Player
}

const PiecesLeft = ({ player }: Props) => {

    let pieceColour: string;
    switch (player.getColour()) {
        case "white":
            pieceColour = "bg-white";
            break;
        case "black":
            pieceColour = "bg-black";
            break;

        default:
            break;
    }

    return (
        <div className="w-16 h-44 p-2 rounded bg-amber-600 flex flex-col gap-0.5">
            {/* <div className={`w-full h-4 rounded ${pieceColour}`}></div> */}
            {Array.from({ length: player.getPiecesLeft() }).map((index) => (
                <div className={`w-full h-4 rounded ${pieceColour}`}></div>
            ))}
        </div>
    )
}

export default PiecesLeft