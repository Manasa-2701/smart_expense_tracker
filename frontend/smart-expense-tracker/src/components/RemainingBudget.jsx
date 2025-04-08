import React, { useState } from "react";

const RemainingBudget = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API or function to fetch the user's budget and expenses for the given category
    try {
      const response = await fetch(`/api/getRemainingBudget?userId=${userId}&category=${category}`);
      const data = await response.json();

      const { budget, totalExpenses } = data;

      const remaining = budget - totalExpenses;

      if (remaining < 0) {
        setMessage("Exceeded");
        setRemainingBudget(null);
      } else {
        setRemainingBudget(remaining);
        setMessage("");
      }
    } catch (error) {
      setMessage("Error fetching data.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Remaining Budget</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br />
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <button type="submit">Check Remaining Budget</button>
      </form>

      {remainingBudget !== null && !message && (
        <div>
          <h3>Remaining Budget: ${remainingBudget}</h3>
        </div>
      )}
      {message && <div><h3>{message}</h3></div>}
    </div>
  );
};

export default RemainingBudget;
