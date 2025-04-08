import { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(""); // User ID input from the user
  const [date, setDate] = useState(""); // Store date of the expense

  const handleAddExpense = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!description || !amount || !category || !userId || !date) {
      alert("All fields are required!");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newExpense = {
      name: description,
      amount: parseFloat(amount),
      category,
      userId, // Add the user ID to the expense
      date, // Add the selected date
    };

    try {
      const response = await axios.post("http://localhost:8080/api/expenses/add", newExpense);
      if (response.status === 200) {
        alert("Expense added successfully!");
        // Reset form after successful submission
        setDescription("");
        setAmount("");
        setCategory("");
        setDate(""); // Reset the date
        setUserId(""); // Reset the user ID
      } else {
        alert("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div className="add-expense">
      <h3>Add Expense</h3>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {/* User ID input */}
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        {/* Date input */}
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
