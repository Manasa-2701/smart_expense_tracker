import React, { useState } from "react";

const ViewExpense = () => {
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/view-expenses?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>View Expenses</h2>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={fetchExpenses}>Fetch Expenses</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ₹{expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpense;
