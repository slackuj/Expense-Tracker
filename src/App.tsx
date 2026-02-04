//import { useState } from 'react'
import './App.css'
import Header from "./components/Header.tsx";
import BudgetTracker from "./components/BudgetTracker.tsx";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="container">
        <Header title={"Expense Tracker"} description={"Expense Tracker App"} />
        <BudgetTracker />
    </div>
  )
}

export default App
