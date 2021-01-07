import React, { useState } from "react";
import {
    TextField,
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import useStyles from "./styles";

import formatDate from "../../../utils/formatDate";
import {
    incomeCategories,
    expenseCategories,
} from "../../../constants/categories";
import { useExpenseTrackerContext } from "../../../context/context";

const initialState = {
    amount: "",
    type: "Income",
    category: "",
    date: formatDate(new Date()),
};

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useExpenseTrackerContext();

    const handleChange = (event) => {
        const formDataItem = event.target.name;
        if (formDataItem === "date") {
            setFormData({
                ...formData,
                [formDataItem]: formatDate(event.target.value),
            });
        } else {
            setFormData({ ...formData, [formDataItem]: event.target.value });
        }
    };

    const handleSubmit = (event) => {
        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: uuidv4(),
        };

        addTransaction(transaction);
        setFormData(initialState);
    };

    let selectedCategories =
        formData.type === "Income" ? incomeCategories : expenseCategories;

    selectedCategories = selectedCategories.map((category) => (
        <MenuItem key={category.type} value={category.type}>
            {category.type}
        </MenuItem>
    ));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...Speechly
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        {selectedCategories}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField
                    value={formData.amount}
                    onChange={handleChange}
                    name="amount"
                    type="number"
                    label="Amount"
                    fullWidth
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    value={formData.date || ""}
                    onChange={handleChange}
                    name="date"
                    type="date"
                    label="Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSubmit}
            >
                Create
            </Button>
        </Grid>
    );
};

export default Form;
