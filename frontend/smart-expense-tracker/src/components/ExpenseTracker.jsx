import { useState, useEffect } from "react";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(""); // New state for date input
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate that all fields are provided
    if (!name || !amount || !category || !date) {
      setError("All fields are required!");
      return;
    }

    if (amount <= 0) {
      setError("Amount should be greater than zero.");
      return;
    }

    const newExpense = {
      name,
      amount: parseFloat(amount),
      category,
      date, // Use the date provided by the user (format: YYYY-MM-DD)
    };

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) throw new Error("Failed to add expense");

      const savedExpense = await response.json();
      setExpenses([...expenses, savedExpense]);

      // Clear the form fields
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2>Expense Tracker</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {/* Date input field */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ${expense.amount} ({expense.category}) on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
