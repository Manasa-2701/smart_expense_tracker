import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AddExpense from "./ExpenseTracker";
import RecentExpenses from "./ViewExpenses";
import ManageBudget from "./ManageBudget";
import ExpenseChart from "./ExpenseChart";
import RecurrentExpense from "./RecurrentExpense";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Expense Tracker Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/add-expense">Add Expense</Link>
          </li>
          <li>
            <Link to="/view-expenses">View Expenses</Link>
          </li>
          <li>
            <Link to="/manage-budget">Manage Budget</Link>
          </li>
          <li>
            <Link to="/expense-chart">Expense Chart</Link>
          </li>
          <li>
            <Link to="/recurrent-expense">Recurrent Expenses</Link>
          </li>
        </ul>
      </nav>
      {/* Optionally render components based on routing */}
    </div>
  );
};

export default Dashboard;
