import { useMutation } from "@tanstack/react-query";
import { Move } from "~/domain/game/types";

type SubmitPayload = {
  gameId: string;
  from: string;
  to: string;
  color: "white" | "black";
};

export function useSubmitMove(onSuccess: (moves: Move[]) => void) {
  return useMutation({
    mutationFn: async ({ gameId, ...payload }: SubmitPayload) => {
      const res = await fetch(`/api/game/${gameId}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.messages);
      return data.data as Move[];
    },
    onSuccess,
  });
}
