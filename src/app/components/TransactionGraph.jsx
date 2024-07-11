import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const TransactionGraph = ({ customer, transactions }) => {
  const data = {
    labels: transactions.map((transaction) => transaction.date),
    datasets: [
      {
        label: `Total transaction amount for ${customer?.name}`,
        data: transactions.map((transaction) => transaction.amount),
        fill: false,
        backgroundColor: "rgba(252, 144, 3,0.6)",
        borderColor: "rgba(252, 144, 3,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Amount per Day",
      },
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Transactions for {customer?.name}</h5>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionGraph;
