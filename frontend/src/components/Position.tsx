import React from 'react'
import { Position } from '../models/Board'
import Piece from './Piece'

type Props = {
    position: Position | null
}

const PositionComponent = ({ position }: Props) => {

    let content = <div></div>

    if (position) {
        content = <div className="bg-yellow-950 rounded-full w-4 h-4 group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"></div>
    } 

    if (position?.piece) {
        content = <Piece piece={position.piece} />
    }

    return (
        content
    )
}

export default PositionComponent
