import React, { useState } from "react";
import { Game } from "../models/Game";
import { Piece } from "../models/Piece";
import Board from "./Board";
import PiecesLeft from "./PiecesLeft";
import PieceUI from "./Piece";

const GameDisplay = () => {
  // Initialize the game
  const [game, setGame] = useState(new Game());

  const handlePieceClick = (index: number) => {
    // Place the piece
    if (game.getCurrentPlayer().getPiecesLeft() > 0) {
      game.getBoard().setPiece(index, game.getCurrentPlayer());
      game.getCurrentPlayer().decrementPiecesLeft();
      game.setCurrentPlayer(
        game.getCurrentPlayer().getColour() === "white"
          ? game.getPlayerBlack()
          : game.getPlayerWhite()
      );
    } else {
      //Select Piece
      if (game.getBoard().getSelectedPiece() == -1) {
        game.getBoard().checkSelectedPiece(index, game.getCurrentPlayer());
      }
      // Move Piece
      else {
        game.getBoard().movePiece(index, game.getCurrentPlayer());
        if (game.getBoard().getIsPieceMoved()) {
          game.getBoard().setIsPieceMoved(false);
          game.setCurrentPlayer(
            game.getCurrentPlayer().getColour() === "white"
              ? game.getPlayerBlack()
              : game.getPlayerWhite()
          );
        }
      }
    }

    // Update the game state
    const gameState = game.getState();
    setGame(new Game(gameState));
  };

  // Render the game board
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10 flex justify-center gap-2 bg-amber-100 p-4 rounded text-black w-60">
        <PieceUI piece={new Piece(game.getCurrentPlayer().getColour())} />
        <h3 className=" text-lg">
          {game.getCurrentPlayer().getColour()}'s turn to play
        </h3>
      </div>
      <section className="flex justify-between gap-12">
        <div className="grid items-center">
          <PiecesLeft player={game.getPlayerWhite()} />
        </div>
        <Board game={game} handlePieceClick={handlePieceClick} />
        <div className="grid items-center">
          <PiecesLeft player={game.getPlayerBlack()} />
        </div>
      </section>
      <button className="mt-8" onClick={() => setGame(new Game())}>
        Reset
      </button>
    </div>
  );
};

export default GameDisplay;
