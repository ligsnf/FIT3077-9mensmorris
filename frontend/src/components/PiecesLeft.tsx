import React from 'react'
import { Player } from "../models/Player";

type Props = {
    player: Player
}

const PiecesLeft = ({ player }: Props) => {
    return (
        <div className="w-16 h-44 p-2 rounded bg-amber-600 flex flex-col gap-0.5 ring-[0.4rem] ring-inset ring-black/20">
            {/* <div className={`w-full h-4 rounded ${pieceColour}`}></div> */}
            {Array.from({ length: player.getPiecesLeft() }).map((item, index) => (
                <div key={index} className={`w-full h-4 rounded ${player.getColour() === "white" ? "bg-white" : "bg-black"}`}></div>
            ))}
        </div>
    )
}

export default PiecesLeft