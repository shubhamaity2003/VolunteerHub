import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function VolunteerPieChart({
  approved,
  pending,
  rejected,
}) {
  const data = {
    labels: [
      "Approved",
      "Pending",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          approved,
          pending,
          rejected,
        ],
        backgroundColor: [
          "#16a34a",
          "#f59e0b",
          "#dc2626",
        ],
      },
    ],
  };

  return (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold mb-4">
      Volunteer Status
    </h2>

    <div className="w-full h-80 flex justify-center items-center">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
);
}