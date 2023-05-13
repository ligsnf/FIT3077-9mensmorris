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

    switch (game.getCurrentPlayer().getMoveType()) {
      case "remove":
        let opponent = game.getCurrentPlayer().getColour() === "white" ? game.getPlayerBlack() : game.getPlayerWhite();
        game.getBoard().removeSelectedPiece(index, game.getCurrentPlayer(), opponent);
        if (game.getBoard().getIsMoveSuccess()) {
          game.getBoard().setIsMoveSuccess(false);
          game.getCurrentPlayer().unsetMoveType();
          game.updateCurrentPlayer();
        }
        break;
      case "place":
        game.getBoard().setPiece(index, game.getCurrentPlayer());
        game.getCurrentPlayer().decrementPiecesLeft();
        game.getCurrentPlayer().incrementPiecesOnBoard();
        if (game.getBoard().getRuleChecker().checkMillFormed()) {
          game.getCurrentPlayer().setMoveType("remove");
        } else {
          game.updateCurrentPlayer();
        }
        break;
      case "slide":
        //Select Piece
        if (game.getBoard().getSelectedPiece() == -1) {
          game.getBoard().checkSelectedPiece(index, game.getCurrentPlayer());
        }
        // Move Piece
        else {
          game.getBoard().movePiece(index, game.getCurrentPlayer());
          if (game.getBoard().getIsMoveSuccess()) {
            game.getBoard().setIsMoveSuccess(false);
            if (game.getBoard().getRuleChecker().checkMillFormed()) {
              game.getCurrentPlayer().setMoveType("remove");
            } else {
              game.updateCurrentPlayer();
            }
          }
        }
        break;
      case "fly":

        break;

      default:
        break;
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
