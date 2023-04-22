import React, { useState } from "react";
import { Game } from "../models/Game";
import Position from "./Position";
import Piece from "./Piece";

const GameBoard = () => {
    // Initialize the game
    const [game, setGame] = useState(new Game());

    const handlePieceClick = (index: number) => {
        // Place the piece
        game.getBoard().setPiece(index, game.getCurrentPlayer());
        game.setCurrentPlayer(game.getCurrentPlayer().getColour() === "white" ? game.getState().playerBlack : game.getState().playerWhite);

        // Update the game state
        const gameState = game.getState();
        setGame(new Game(gameState));
    };

    // Test rendering mill
    const piece0 = game.getBoard().getPosition(0).piece?.getColour();
    const piece3 = game.getBoard().getPosition(3).piece?.getColour();
    const piece6 = game.getBoard().getPosition(6).piece?.getColour();
    const isWinningRow = (piece0 === piece3 && piece3 === piece6 && piece0 !== undefined);

    // Render the game board
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-8 flex justify-center gap-2 bg-amber-100 p-4 rounded text-black w-60">
                <Piece colour={game.getCurrentPlayer().getColour()} />
                <h3 className=" text-lg">{game.getCurrentPlayer().getColour()}'s turn to play</h3>
            </div>
            <section className="board bg-amber-100 relative">
                {/* Render Mills */}
                <div>
                    {/* Outer */}
                    <div id="0-6" className={`bg-yellow-950 w-[21.15rem] h-1 absolute top-[1.875rem] left-[1.875rem] ${isWinningRow && "shadow-[0_0px_6px_3px_rgba(34,197,94,1)]"}`}></div>
                    <div id="0-42" className="bg-yellow-950 w-1 h-[21.15rem] absolute top-[1.875rem] left-[1.875rem]"></div>
                    <div id="6-48" className="bg-yellow-950 w-1 h-[21.15rem] absolute top-[1.875rem] right-[1.875rem]"></div>
                    <div id="42-48" className="bg-yellow-950 w-[21.15rem] h-1 absolute bottom-[1.875rem] left-[1.875rem]"></div>
                    {/* Middle */}
                    <div id="8-12" className="bg-yellow-950 w-[14.32rem] h-1 absolute top-[5.36rem] left-[5.36rem]"></div>
                    <div id="8-36" className="bg-yellow-950 w-1 h-[14.32rem] absolute top-[5.36rem] left-[5.36rem]"></div>
                    <div id="12-40" className="bg-yellow-950 w-1 h-[14.32rem] absolute top-[5.36rem] right-[5.36rem]"></div>
                    <div id="36-40" className="bg-yellow-950 w-[14.32rem] h-1 absolute bottom-[5.36rem] left-[5.36rem]"></div>
                    {/* Inner */}
                    <div id="16-18" className="bg-yellow-950 w-[7.2rem] h-1 absolute top-[8.9rem] left-[8.9rem]"></div>
                    <div id="16-30" className="bg-yellow-950 w-1 h-[7.2rem] absolute top-[8.9rem] left-[8.9rem]"></div>
                    <div id="18-32" className="bg-yellow-950 w-1 h-[7.2rem] absolute top-[8.9rem] right-[8.9rem]"></div>
                    <div id="30-32" className="bg-yellow-950 w-[7.2rem] h-1 absolute bottom-[8.9rem] left-[8.9rem]"></div>
                    {/* Intersecting */}
                    <div id="3-17" className="bg-yellow-950 w-1 h-[7.2rem] absolute top-[1.875rem] left-[12.4rem]"></div>
                    <div id="21-23" className="bg-yellow-950 w-[7.2rem] h-1 absolute top-[12.4rem] left-[1.875rem]"></div>
                    <div id="25-27" className="bg-yellow-950 w-[7.2rem] h-1 absolute top-[12.4rem] right-[1.875rem]"></div>
                    <div id="31-45" className="bg-yellow-950 w-1 h-[7.2rem] absolute bottom-[1.875rem] left-[12.4rem]"></div>
                </div>
                {/* Render Pieces */}
                <div className="grid grid-cols-7 gap-6 w-[25rem] p-4 shadow-[0_0px_0px_16px_rgba(217,119,6,1)] relative rounded">
                    {game.getBoard().getPositions().map((position, index) => (
                        <div
                            key={index}
                            id={index.toString()}
                            className={`w-8 h-8 grid place-items-center group ${position && "hover:cursor-pointer"}`}
                            onClick={() => handlePieceClick(index)}
                        >
                            <Position position={position} />
                        </div>
                    ))}
                </div>
            </section>
            <button className="mt-8" onClick={() => setGame(new Game())}>
                Reset
            </button>
        </div>
    );
};

export default GameBoard;
