import React, { useReducer, createContext, useContext } from "react";
import contextReducer from "./contextReducer";

const initialState = [];

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

    return (
        <ExpenseTrackerContext.Provider
            value={{ deleteTransaction, addTransaction, transactions }}
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
