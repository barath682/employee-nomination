"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function VoteCount() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVotes() {
      const res = await fetch("/api/nominations");
      const data = await res.json();
      if (data.success) {
        const counts = {};
        data.nominations.forEach((n) => {
          counts[n.nomineeName] = (counts[n.nomineeName] || 0) + 1;
        });

        const result = Object.entries(counts).map(([name, count]) => ({
          name,
          count,
        }));

        setVotes(result);
        setLoading(false);
      }
    }
    fetchVotes();
  }, []);

  const data = {
    labels: votes.map((v) => v.name),
    datasets: [
      {
        label: "Votes",
        data: votes.map((v) => v.count),
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#facc15",
          "#f472b6",
          "#a78bfa",
          "#34d399",
          "#f87171",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "📊 Vote Distribution",
        color: "#1e3a8a",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-100 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-indigo-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          🏆 Employee of the Month - Vote Count
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg animate-pulse">
            Fetching vote data...
          </div>
        ) : votes.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No votes submitted yet.
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {votes.map((v) => (
                <li
                  key={v.name}
                  className="flex justify-between items-center bg-gradient-to-r from-indigo-100 to-indigo-50 px-6 py-4 rounded-xl shadow hover:scale-[1.02] transition-transform duration-300"
                >
                  <span className="text-lg font-semibold text-indigo-700">
                    {v.name}
                  </span>
                  <span className="text-xl font-bold text-indigo-900">
                    {v.count} vote{v.count > 1 ? "s" : ""}
                  </span>
                </li>
              ))}
            </ul>

            <div className="bg-white border rounded-xl shadow-md p-6">
              <Bar data={data} options={options} height={200} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
