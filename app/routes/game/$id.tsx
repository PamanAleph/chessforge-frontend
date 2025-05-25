import { useParams } from "@remix-run/react";
import { Board } from "~/features/game/components/Board";
import { useGameMoves } from "~/features/game/hooks/useGameMove";
import { useSubmitMove } from "~/features/game/hooks/useSubmitMove";

export default function GamePlay() {
  const { id } = useParams();
  const {
    data: moves = [],
    isLoading,
    isError,
    refetch,
  } = useGameMoves(id);

  const { mutate: submitMove, isPending } = useSubmitMove(() => {
    refetch(); // refresh langkah dari server
  });

  function handlePlayerMove(from: string, to: string) {
    if (!id) return;
    submitMove({ gameId: id, from, to, color: "white" });
  }

  const initialMoves = moves.map((m) => ({ from: m.from, to: m.to }));

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-xl font-semibold mb-4">Game: {id}</h1>
      {isPending && <p className="text-gray-500">Submitting move...</p>}
      {isLoading && <p className="text-gray-500">Loading board...</p>}
      {isError && <p className="text-red-500">Failed to load moves</p>}

      {!isLoading && !isError && (
        <Board initialMoves={initialMoves} onPlayerMove={handlePlayerMove} />
      )}
    </div>
  );
}
