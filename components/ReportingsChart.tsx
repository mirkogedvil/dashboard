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

const ReportingsChart = (response) => {
  const labels = response.response.reportings?.map((item: any) => item.day);
  const values = response.response.reportings?.map((item: any) => item.count);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Last 7 days reportings",
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
        <CardTitle>Reportings</CardTitle>
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
                        response.response?.reportings?.[tooltipItem.dataIndex]
                          .day;
                      return [`Count: ${tooltipItem.raw}`];
                    },
                  },
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Reportings Count",
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

export default ReportingsChart;
