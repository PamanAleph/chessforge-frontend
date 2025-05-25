import { useParams } from "@remix-run/react";
import { Board } from "~/features/game/components/Board";
import { useSubmitMove } from "~/features/game/hooks/useSubmitMove";
import toast from "react-hot-toast";
import { useGameMoves } from "~/features/game/hooks/useGameMove";
import { useResignGame } from "~/features/game/hooks/useResignGame";

export default function GamePlay() {
  const { id } = useParams();
  const { data: moves = [], isLoading, isError, refetch } = useGameMoves(id);
  const { mutate: submitMove, isPending } = useSubmitMove(() => {
    refetch();
  });
  const resignGame = useResignGame(() => {
    toast.success("Game resigned!");
  });

  function handleResign() {
    if (!id) return;
    resignGame.mutate(id, {
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : "Gagal resign";
        toast.error(message);
      },
    });
  }

  function handlePlayerMove(from: string, to: string) {
    if (!id) return;
    submitMove(
      { gameId: id, from, to, color: "white" },
      {
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : "Gagal submit langkah";
          toast.error(message);
        },
      }
    );
  }

  const initialMoves = moves.map((m) => ({ from: m.from, to: m.to }));

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-xl font-semibold mb-4">Game: {id}</h1>

      {isLoading && <p className="text-gray-500">Loading game...</p>}
      {isError && <p className="text-red-500">Gagal mengambil langkah</p>}

      {!isLoading && !isError && (
        <Board
          initialMoves={initialMoves}
          onPlayerMove={handlePlayerMove}
          disabled={isPending}
        />
      )}

      {isPending && (
        <p className="mt-4 text-sm text-gray-400">Submitting move...</p>
      )}

      <button
        onClick={handleResign}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        disabled={resignGame.isPending}
      >
        {resignGame.isPending ? "Resigning..." : "Resign Game"}
      </button>
    </div>
  );
}
