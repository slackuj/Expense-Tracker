import './BudgetTracker.css';
import {useState} from "react";

type Category = "Income" | "Expense";
interface budgetItem {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: Category;
}

const INITIAL_BUDGET_ITEMS: budgetItem[] = [
    {
        id: "id1",
        description: "Salary",
        amount: 5000,
        date: "2026-01-01",
        category: "Income"
    },
    {
        id: "id2",
        description: "coffee",
        amount: 200,
        date: "2026-01-20",
        category: "Expense"
    }

];

const BudgetTracker = () => {

    const [ budgetItems, setBudgetItems] = useState<budgetItem []>(INITIAL_BUDGET_ITEMS);
    console.log(budgetItems);
    return (
        <div className="budget-tracker">
            <div>
                <h2>Form</h2>
                <form></form>
            </div>
            <div className="budget-list">
                {budgetItems.map(item => (
                    <div className="budget-item" key={item.id}>
                        <p className="b-description">{item.description}</p>
                        <p className="b-amount">{item.amount}</p>
                        <p className="b-date">{item.date}</p>
                        <p className="b-category">{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BudgetTracker;