"use client";
import { useEffect, useState } from "react";
import "./WinnerDisplay.css";


export default function WinnerDisplay() {
  const [month, setMonth] = useState("");
  const [winner, setWinner] = useState(null);

  const handleMonthChange = (e) => setMonth(e.target.value);

  useEffect(() => {
    if (!month) return;

    async function fetchWinner() {
      const res = await fetch("/api/nominations");
      const data = await res.json();
      if (data.success) {
        const filtered = data.nominations.filter((n) => n.month === month);
        const counts = {};
        filtered.forEach((n) => {
          counts[n.nomineeName] = (counts[n.nomineeName] || 0) + 1;
        });

        const winnerEntry = Object.entries(counts).reduce(
          (max, entry) => (entry[1] > max[1] ? entry : max),
          ["", 0]
        );

        setWinner({ name: winnerEntry[0], votes: winnerEntry[1] });
      }
    }

    fetchWinner();
  }, [month]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-3">Winner of the Month</h2>
      <input
        type="month"
        onChange={handleMonthChange}
        className="w-full p-2 border rounded mb-4"
      />
      {winner ? (
        <p className="text-lg">
          🏆 <strong>{winner.name}</strong> with{" "}
          <strong>{winner.votes} vote(s)</strong>
        </p>
      ) : month ? (
        <p>No nominations for selected month.</p>
      ) : (
        <p>Select a month to view winner.</p>
      )}
    </div>
  );
}
