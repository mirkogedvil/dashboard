import { Line } from "react-chartjs-2";
import { Chart, registerables, TimeScale } from "chart.js";

import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import { format, getISOWeek } from "date-fns";
import dayjs from "dayjs";

// Register the required components
Chart.register(...registerables, TimeScale, annotationPlugin);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { ResponsiveContainer } from "recharts";

function ProjectTimelineChart({ data, interval }) {
  const today = dayjs().format("DD.MM.YYYY");
  const chartData = {
    labels: data.map((item) => dayjs(item.date).format("YYYY-MM-DD")), // Ensure date is a Date object
    datasets: [
      {
        label: "Active Projects",
        data: data.map((item) => item.activeCount),
        borderColor: "rgba(3, 104, 255)",
        borderWidth: 1,
        tension: 0.3,
        backgroundColor: "rgba(3, 104, 255, 0.25)",
        fill: true,
        datalabels: {
          display: true,
          align: "top", // Position above the line
          anchor: "end", // Attach the label to the end of the bar
          color: "black", // Change the label color if needed
          font: {
            //weight: "bold", // Make label text bold
            size: 12, // Adjust size as needed
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: interval === "monthly" ? "month" : "week",
          tooltipFormat: "dd.MM.yyyy", // Format for tooltips
          displayFormats: {
            month: "MMM YYYY", // Format for monthly labels
            week: "dd.MM", // Format for weekly labels
          },
        },
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          callback: function (value) {
            const date = new Date(value);
            const formattedDate = format(date, "dd.MM.yyyy"); // Format date as "DD.MM.YYYY"
            const weekNumber = getISOWeek(date); // Get the ISO week number
            return `${formattedDate}(W${weekNumber})`; // Display "DD.MM.YYYY(WXX)"
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Active Projects",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      annotation: {
        annotations: {
          todayLine: {
            type: "line",
            mode: "vertical",
            scaleID: "x",
            value: dayjs().format("YYYY-MM-DD"),
            borderColor: "rgba(3, 104, 255)",
            borderWidth: 2,
            label: {
              content: "Today",
              enabled: true,
              position: "top",
              color: "red",
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <Line data={chartData} options={options} />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ProjectTimelineChart;
