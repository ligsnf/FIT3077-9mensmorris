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
        game.getBoard().removeSelectedPiece(index, game.getCurrentPlayer(), game.getOtherPlayer());
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
        game.checkMillFormed();
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
            game.checkMillFormed();
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

  // Text to show above board
  let statusText
  switch (game.getCurrentPlayer().getMoveType()) {
    case "remove":
      statusText = "Remove opponent's piece"
      break;
    case "place":
      statusText = "Place a piece"
      break;
    case "slide":
      if (game.getBoard().getSelectedPiece() == -1) {
        statusText = "Select a piece"
      } else {
        statusText = "Move your piece"
      }
      break;
    case "fly":
      if (game.getBoard().getSelectedPiece() == -1) {
        statusText = "Select a piece"
      } else {
        statusText = "Move your piece"
      }
      break;
    default:
      break;
  }

  // Render the game board
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10 flex gap-4 bg-amber-100 p-4 rounded text-black w-72">
        <PieceUI piece={new Piece(game.getCurrentPlayer().getColour())} />
        <h3 className="text-lg">
          {statusText}
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
