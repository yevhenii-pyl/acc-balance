import React from "react";
import { Theme, makeStyles, Container, Grid } from "@material-ui/core";

import SearchBar from "./SearchBar";
import AccountsList from "./AccountsList";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: { height: "100vh", backgroundColor: theme.palette.primary.dark },
  mainContainer: { margin: "0 auto" },
  paper: {
    paddingTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.grey[100],
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="sm" className={classes.mainContainer}>
        <div className={classes.paper}>
          <Grid container spacing={6}>
            <Grid
              item
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <SearchBar />
            </Grid>
            <Grid
              item
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <AccountsList />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default App;
