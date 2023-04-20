import React, { useState } from "react";
import { Board } from "../models/Board";
import Position from "./Position";
import Piece from "./Piece";

const GameBoard = () => {
    // Initialize the game board
    const [board, setBoard] = useState(new Board());

    const handlePieceClick = (index: number) => {
        // Place the piece
        board.placePiece(index, board.getState().currentPlayer);

        // Update the game board
        const gameState = board.getState();
        setBoard(new Board(gameState));
    };

    // Render the game board
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-8 flex justify-center gap-2 bg-amber-100 p-4 rounded text-black w-fit">
                <Piece colour={board.getState().currentPlayer.getColour()} />
                <h3 className=" text-lg">{board.getState().currentPlayer.getColour()}'s turn to play</h3>
            </div>
            <section className="grid grid-cols-7 gap-6 bg-amber-100 w-[25rem] p-4 shadow-[0_0px_0px_16px_rgba(217,119,6,1)] relative rounded">
                {board.getState().positions.map((position, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 grid place-items-center group hover:cursor-pointer"
                        onClick={() => handlePieceClick(index)}
                    >
                        <Position position={position} />
                    </div>
                ))}
            </section>
            <button className="mt-8" onClick={() => setBoard(new Board())}>
                Reset
            </button>
        </div>
    );
};

export default GameBoard;
