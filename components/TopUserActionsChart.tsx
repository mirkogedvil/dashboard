// components/TopUserActionsChart.js
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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopUserActionsChart = (response) => {
  const labels = response.response.topFiveActions?.map(
    (item: any) => item.user
  );
  const values = response.response.topFiveActions?.map(
    (item: any) => item.count
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Top Active 10 Users",
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
        <CardTitle></CardTitle>
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
                      const database =
                        response.response?.topFiveActions?.[
                          tooltipItem.dataIndex
                        ].database;
                      return [
                        `Database: ${database}`,
                        `Count: ${tooltipItem.raw}`,
                      ];
                    },
                  },
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Action Count",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Users",
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

export default TopUserActionsChart;
