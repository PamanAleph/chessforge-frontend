import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function GameStart() {
  const [botLevel, setBotLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleStart() {
    setLoading(true);
    const res = await fetch("/api/game/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bot_level: botLevel }),
    });
    const data = await res.json();
    if (data.success) {
      navigate(`/game/${data.data.game_id}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Start New Game vs Bot</h1>
      <Label>Bot Level (1-10)</Label>
      <Input
        type="number"
        min={1}
        max={10}
        value={botLevel}
        onChange={(e) => setBotLevel(Number(e.target.value))}
      />
      <Button onClick={handleStart} disabled={loading}>
        {loading ? "Starting..." : "Start Game"}
      </Button>
    </div>
  );
}
