import React, { useReducer, createContext, useContext } from "react";
import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

const ExpenseTrackerContext = createContext(initialState);

export const ExpenseTrackerProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators
    const deleteTransaction = (id) => {
        dispatch({ type: "DELETE_TRANSACTION", payload: id });
    };
    const addTransaction = (transaction) => {
        dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    };

    const balance = transactions.reduce((acc, currVal) => {
        return currVal.type === "Expense"
            ? acc - currVal.amount
            : acc + currVal.amount;
    }, 0);

    return (
        <ExpenseTrackerContext.Provider
            value={{ deleteTransaction, addTransaction, transactions, balance }}
        >
            {children}
        </ExpenseTrackerContext.Provider>
    );
};

export const useExpenseTrackerContext = () => {
    const context = useContext(ExpenseTrackerContext);
    if (context === undefined) {
        throw new Error(
            "useExpenseTrackerContext must be used within a ExpenseTrackerProvider"
        );
    }
    return context;
};
