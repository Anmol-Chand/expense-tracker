import { useExpenseTrackerContext } from "../context/context";

import {
    incomeCategories,
    expenseCategories,
    resetCategories,
} from "../constants/categories";

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useExpenseTrackerContext();
    const transactionPerType = transactions.filter((t) => t.type === title);
    const total = transactionPerType.reduce(
        (acc, currVal) => (acc += currVal.amount),
        0
    );
    const categories =
        title === "Income" ? incomeCategories : expenseCategories;

    transactionPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category);

        if (category) category.amount += t.amount;
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    // Chart Data generation
    console.log(transactionPerType);
    const chartData = {
        labels: filteredCategories.map((c) => c.type),
        datasets: [
            {
                data: filteredCategories.map((c) => c.amount),
                backgroundColor: filteredCategories.map((c) => c.color),
            },
        ],
    };

    return { total, chartData };
};

export default useTransactions;
