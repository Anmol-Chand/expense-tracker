import React, { useState, useEffect } from "react";
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

import { useSpeechContext } from "@speechly/react-client";
import CustomizedSnackbar from "../../Snackbar/Snackbar";

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
    const { segment } = useSpeechContext();

    const [open, setOpen] = useState(false);

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
        if (
            Number.isNaN(Number(formData.amount)) ||
            !formData.date.includes("-")
        )
            return;
        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: uuidv4(),
        };

        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    };

    useEffect(() => {
        if (segment) {
            // console.log(segment);
            if (segment.intent.intent === "add_expense") {
                setFormData({ ...formData, type: "Expense" });
            } else if (segment.intent.intent === "add_income") {
                setFormData({ ...formData, type: "Income" });
            } else if (
                segment.isFinal &&
                segment.intent.intent === "create_transaction"
            ) {
                return handleSubmit();
            } else if (
                segment.isFinal &&
                segment.intent.intent === "cancel_transaction"
            ) {
                setFormData(initialState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value
                    .slice(1)
                    .toLowerCase()}`;
                switch (e.type) {
                    case "amount":
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case "category":
                        if (
                            incomeCategories
                                .map((iC) => iC.type)
                                .includes(category)
                        ) {
                            setFormData({
                                ...formData,
                                type: "Income",
                                category,
                            });
                        } else if (
                            expenseCategories
                                .map((iC) => iC.type)
                                .includes(category)
                        ) {
                            setFormData({
                                ...formData,
                                type: "Expense",
                                category,
                            });
                        }
                        break;
                    case "date":
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            });

            if (
                segment.isFinal &&
                formData.amount &&
                formData.category &&
                formData.type &&
                formData.date
            ) {
                handleSubmit();
            }
        }
    }, [segment]);

    let selectedCategories =
        formData.type === "Income" ? incomeCategories : expenseCategories;

    selectedCategories = selectedCategories.map((category) => (
        <MenuItem key={category.type} value={category.type}>
            {category.type}
        </MenuItem>
    ));

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment?.words.map((w) => w.value).join(" ")}
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
