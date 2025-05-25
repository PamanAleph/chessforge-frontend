import { useQuery } from "@tanstack/react-query";
import { Move } from "~/domain/game/types";

export function useGameMoves(gameId: string | undefined) {
  return useQuery<Move[]>({
    queryKey: ["game", gameId, "moves"],
    queryFn: async () => {
      if (!gameId) throw new Error("Game ID is required");
      const res = await fetch(`/api/game/${gameId}/moves`);
      const data = await res.json();
      if (!data.success) throw new Error(data.messages);
      return data.data as Move[];
    },
    enabled: !!gameId, // hanya jalan kalau gameId ada
  });
}
