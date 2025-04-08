import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageBudget = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate(); // For redirection after submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const budgetData = {
      userId: parseInt(userId),
      category,
      budget: parseFloat(budget),
      month: parseInt(month),
      year: parseInt(year),
    };

    try {
      const response = await fetch("http://localhost:8080/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetData),
      });

      if (response.ok) {
        alert("Budget added successfully!");
        navigate("/dashboard"); // Redirect to dashboard after adding budget
      } else {
        alert("Failed to add budget");
      }
    } catch (error) {
      console.error("Error adding budget:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="budget-container">
      <h2>Manage Budget</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} required />

        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

        <label>Budget Amount:</label>
        <input type="number" step="0.01" value={budget} onChange={(e) => setBudget(e.target.value)} required />

        <label>Month:</label>
        <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} min="1" max="12" required />

        <label>Year:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} min="2000" required />

        <button type="submit">Add Budget</button>
      </form>
    </div>
  );
};

export default ManageBudget;
