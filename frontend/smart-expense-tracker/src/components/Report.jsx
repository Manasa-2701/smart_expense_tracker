import { useState } from "react";

function Report() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchReport = async () => {
    if (!month || !year) {
      alert("Please select month and year.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
      const response = await fetch(
        `http://localhost:8080/api/reports?userId=${userId}&month=${month}&year=${year}`
      );

      if (!response.ok) throw new Error("Failed to fetch report");

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div>
      <h2>Monthly Report</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Select Month</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={fetchReport}>Get Report</button>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} - ${expense.amount} (Date: {expense.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Report;
