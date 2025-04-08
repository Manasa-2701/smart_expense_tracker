import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import ManageBudget from "./components/ManageBudget";
import ExpenseChart from "./components/ExpenseChart";
import RecurrentExpense from "./components/RecurrentExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/view-expenses" element={<ViewExpenses />} />
        <Route path="/report" element={<Report />} />
        <Route path="/manage-budget" element={<ManageBudget />} /> 
        <Route path="/expense-chart" element={<ExpenseChart />} /> 
        <Route path="/recurrent-expense" element={<RecurrentExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
