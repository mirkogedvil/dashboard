import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ResponsiveContainer } from "recharts";

import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CreatedStagesChart = (response) => {
  const labels = response.response.createdStages?.map((item: any) => item.day);
  const values = response.response.createdStages?.map(
    (item: any) => item.count
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Last 7 days created stages",
        data: values,
        backgroundColor: "rgba(3, 104, 255, 0.25)",
        borderColor: "rgba(3, 104, 255)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stages</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const day =
                        response.response?.createdStages?.[
                          tooltipItem.dataIndex
                        ].day;
                      return [`Count: ${tooltipItem.raw}`];
                    },
                  },
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1, // Set the step size for the y-axis
                  },
                  title: {
                    display: true,
                    text: "Stage Count",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Days",
                  },
                },
              },
            }}
          />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CreatedStagesChart;
