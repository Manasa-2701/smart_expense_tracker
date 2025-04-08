import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RecurrentExpenseForm() {
  const [expense, setExpense] = useState({
    userId: "",
    expenseName: "",
    amount: "",
    startDate: "",
    endDate: "",
    frequency: "",
    description: "",
    recurrenceType: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/recurrent-expenses", expense);
      alert("Recurrent expense added successfully!");
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <div>
      <h2>Add Recurrent Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="userId" value={expense.userId} onChange={handleChange} required />

        <label>Expense Name:</label>
        <input type="text" name="expenseName" value={expense.expenseName} onChange={handleChange} required />

        <label>Amount:</label>
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={expense.startDate} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={expense.endDate} onChange={handleChange} />

        <label>Frequency:</label>
        <select name="frequency" value={expense.frequency} onChange={handleChange} required>
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <label>Description:</label>
        <input type="text" name="description" value={expense.description} onChange={handleChange} />

        <label>Recurrence Type:</label>
        <select name="recurrenceType" value={expense.recurrenceType} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
