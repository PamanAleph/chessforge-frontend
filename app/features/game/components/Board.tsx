import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

type Props = {
  initialMoves: { from: string; to: string }[];
  onPlayerMove: (from: string, to: string) => void;
};

export function Board({ initialMoves, onPlayerMove }: Props) {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState("start");

  // Apply existing moves from backend
  useEffect(() => {
    game.reset();
    for (const move of initialMoves) {
      game.move({ from: move.from, to: move.to });
    }
    setFen(game.fen());
  }, [initialMoves, game]);

  function handleMove(from: string, to: string) {
    const result = game.move(`${from}${to}`);
    if (result) {
      setFen(game.fen());
      onPlayerMove(from, to);
    }
  }

  return (
    <Chessboard
      position={fen}
      onPieceDrop={(from, to) => {
        handleMove(from, to);
        return true;
      }}
      boardWidth={400}
    />
  );
}
