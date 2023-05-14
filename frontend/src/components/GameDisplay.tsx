import { useState, useEffect } from "react";
import { Game } from "../models/Game";
import { Piece } from "../models/Piece";
import Board from "./Board";
import PiecesLeft from "./PiecesLeft";
import PieceUI from "./Piece";

const GameDisplay = () => {
  // Initialize the game
  const [game, setGame] = useState(new Game());
  let statusText

  useEffect(() => {
    // TODO: show pop up if game is over
    if (game.getIsGameOver()) {
      console.log(game.checkGameOver(game.getCurrentPlayer(), game.getOtherPlayer()))
    }

    return () => {
    }
  }, [game])

  const handlePieceClick = (index: number) => {

    if (game.getIsGameOver()) { return } // cannot click if game is over
    // Handle move based on move type
    switch (game.getCurrentPlayer().getMoveType()) {
      case "remove":
        game.getBoard().removeSelectedPiece(index, game.getCurrentPlayer(), game.getOtherPlayer());
        break;
      case "place":
        game.getBoard().placeSelectedPiece(index, game.getCurrentPlayer());
        break;
      case "slide":
        game.getBoard().moveSelectedPiece(index, game.getCurrentPlayer());
        break;
      case "fly":
        game.getBoard().moveSelectedPiece(index, game.getCurrentPlayer());
        break;
      default:
        break;
    }
    if (game.getBoard().getIsMoveSuccess()) {
      game.getBoard().setIsMoveSuccess(false);
      game.checkMillFormed();
      game.checkGameOver(game.getCurrentPlayer(), game.getOtherPlayer());
    }
    game.getBoard().clearValidMoves();
    game.getBoard().showValidMoves(game.getCurrentPlayer());

    // Update the game state
    const gameState = game.getState();
    setGame(new Game(gameState));
  };

  // Text to show above board
  if (!game.getIsGameOver()) {
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
  }

  // Render the game board
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10 flex gap-4 bg-amber-100 p-4 rounded text-black w-80">
        <PieceUI piece={new Piece(game.getCurrentPlayer().getColour())} isValidMove={false} />
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
