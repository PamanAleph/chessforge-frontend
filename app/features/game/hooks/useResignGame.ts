import { useMutation } from "@tanstack/react-query";

export function useResignGame(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (gameId: string) => {
      const res = await fetch(`/api/game/${gameId}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: "resigned" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.messages);
      return data;
    },
    onSuccess,
  });
}
