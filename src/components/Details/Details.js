import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import { Doughnut } from "react-chartjs-2";

import useStyles from "./styles";
import useTransactions from "../../hooks/useTransactions";

const Details = ({ title }) => {
    const classes = useStyles();
    const { total, chartData } = useTransactions(title);

    // const cardClass = classes[title.toLowerCase()];
    console.log(title);
    return (
        <Card className={classes[title.toLowerCase()]}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5">$ {total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    );
};

export default Details;
