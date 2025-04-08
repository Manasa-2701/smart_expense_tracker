import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0); // New state to store total expenses
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    if (!userId || !startDate || !endDate) {
      setError("Please enter all values!");
      return;
    }

    setError(""); 
    setChartData(null); 
    setTotalExpenses(0); // Reset total before fetching

    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/category-wise?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (Object.keys(data).length === 0) {
        setError("No data found for this period.");
        setChartData(null);
        return;
      }

      // Calculate total expenses
      const total = Object.values(data).reduce((acc, value) => acc + value, 0);
      setTotalExpenses(total);

      setChartData({
        labels: Object.keys(data), 
        datasets: [
          {
            data: Object.values(data), 
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#4CAF50"],
          },
        ],
      });

      setError(""); 
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Something went wrong. Please try again.");
      setChartData(null);
      setTotalExpenses(0);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Expense Chart</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />

      <button
        onClick={fetchExpenses}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
      >
        Generate Pie Chart
      </button>

      {chartData && (
        <div className="w-80 h-80 mt-6">
          <Pie data={chartData} />
        </div>
      )}

      {/* Display total expenses at the bottom */}
      {chartData && (
        <p className="mt-4 text-lg font-semibold">
          Total Expenses: <span className="text-blue-600">₹{totalExpenses.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
};

export default ExpenseChart;
