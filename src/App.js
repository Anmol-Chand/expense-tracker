import { Container, Grid } from "@material-ui/core";
import React from "react";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";

import { ExpenseTrackerProvider } from "./context/context";
import ErrorBoundary from "./ErrorBoundary";

import useStyles from "./styles";

function App() {
  const classes = useStyles();
  return (
    <ExpenseTrackerProvider>
      <div className="App">
        <Container className={classes.container} style={{ height: "100vh" }}>
          <Grid
            className={classes.grid}
            container
            spacing={3}
            alignItems="center"
            justify="center"
            style={{ height: "100vh" }}
          >
            <Grid item xs={12} md={4}>
              <Details title="Income" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Main />
            </Grid>
            <Grid item xs={12} md={4}>
              <Details title="Expense" />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ExpenseTrackerProvider>
  );
}

export default App;
