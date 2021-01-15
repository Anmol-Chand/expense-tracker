import { Container, Grid } from "@material-ui/core";
import React from "react";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";

import ErrorBoundary from "./ErrorBoundary";

import useStyles from "./styles";

import {
    PushToTalkButton,
    PushToTalkButtonContainer,
    ErrorPanel,
} from "@speechly/react-ui";

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Container
                className={classes.container}
                style={{ height: "100vh" }}
            >
                <Grid
                    className={classes.grid}
                    container
                    spacing={3}
                    alignItems="center"
                    justify="center"
                    style={{ height: "100vh" }}
                >
                    <Grid item xs={12} sm={4} className={classes.mobile}>
                        <Details title="Income" />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.main}>
                        <Main />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={`${classes.desktop} ${classes.last}`}
                    >
                        <Details title="Income" />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.last}>
                        <Details title="Expense" />
                    </Grid>
                </Grid>
            </Container>
            <PushToTalkButtonContainer>
                <PushToTalkButton size="5rem" />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    );
}

export default App;
