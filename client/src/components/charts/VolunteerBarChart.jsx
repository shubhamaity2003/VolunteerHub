import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function VolunteerBarChart({
  analytics,
}) {
  const data = {
    labels: [
      "Approved",
      "Pending",
      "Rejected",
    ],
    datasets: [
      {
        label: "Volunteers",
        data: [
          analytics.approved,
          analytics.pending,
          analytics.rejected,
        ],
      },
    ],
  };

 return (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold mb-4">
      Volunteer Statistics
    </h2>

    <div className="w-full h-80">
      <Bar
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