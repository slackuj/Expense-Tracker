import './BudgetTracker.css';
import * as React from "react";
import {useEffect, useState} from "react";

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

const INITIALIZE_BUDGET_ITEMS = (): budgetItem[] =>{

const items = localStorage.getItem("budgetItems");
if (items) {
    try {
        return JSON.parse(items);
    } catch (e) {
        // If parsing fails, reset to initial
        localStorage.setItem("budgetItems", JSON.stringify(INITIAL_BUDGET_ITEMS));
        return(INITIAL_BUDGET_ITEMS);
    }
}
else{
    return(INITIAL_BUDGET_ITEMS);
}
}
const BudgetTracker = () => {

    const [ budgetItems, setBudgetItems] = useState<budgetItem []>(INITIALIZE_BUDGET_ITEMS);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState('');
    const [category, setCategory] = useState<Category>('Expense');

    /*useEffect(() => {
        // Load from local storage or initialize if not present
        const items = localStorage.getItem("budgetItems");
        if (items) {
            try {
                const itemParsed: budgetItem[] = JSON.parse(items);
                setBudgetItems(itemParsed);
            } catch (e) {
                // If parsing fails, reset to initial
                setBudgetItems(INITIAL_BUDGET_ITEMS);
                localStorage.setItem("budgetItems", JSON.stringify(INITIAL_BUDGET_ITEMS));
            }
        } else {
            // If nothing in localStorage, initialize it
            localStorage.setItem("budgetItems", JSON.stringify(INITIAL_BUDGET_ITEMS));
        }
    }, []);*/

    useEffect(() => {
        // Save to local storage
        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    }, [budgetItems]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(description.trim().length === 0){
            alert("Please enter description");
            return;
        }

        if (amount === undefined || isNaN(amount) || amount <= 0) {
            alert("Please enter amount");
            return;
        }

        const itemToAdd: budgetItem = {
            id: crypto.randomUUID(),
            description,
            amount: amount ?? 0,
            date: date,
            category: category
        };

        setBudgetItems(prev=> [...prev, itemToAdd]);
        setDescription("");
        setAmount(0);
        setDate("");
        setCategory("Expense");
    };

    const handleDelete = (id: string) => {
        const newBudgetItems = budgetItems.filter(item => item.id !== id);
        setBudgetItems(newBudgetItems);
    }

    return (
        <div className="budget-tracker">
            <div>
                <h2>Form</h2>
                <form className="budget-tracker-form" onSubmit={handleSubmit}>
                   <input
                       type="text"
                       placeholder="Enter budget items ..."
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}
                       className="budget-tracker-form__input"
                   />
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="budget-tracker-form__input"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="budget-tracker-form__input"
                    />
                    <select
                        value={category}
                        onChange={(e) => {setCategory(e.target.value as Category)}}
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                    <button
                        type="submit"
                        className="budget-tracker-form__submit"
                    >Submit</button>
                </form>
            </div>
            <div className="budget-list">
                {budgetItems.map(item => (
                    <div className="budget-item" key={item.id}>
                        <p className="b-description">{item.description}</p>
                        <p className="b-amount">{item.amount}</p>
                        <p className="b-date">{item.date}</p>
                        <p className="b-category">{item.category}</p>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BudgetTracker;