import React, { useState } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

import { Typography, Grid, makeStyles, Theme } from "@material-ui/core";

import AccountListItem from "./AccountListItem";

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& ul": {
      listStyle: "none",
      display: "flex",
      width: "100%",
      justifyContent: "space-around",
      fontWeight: "bold",
      color: theme.palette.grey[600],
      "& li": {
        cursor: "pointer",
        padding: theme.spacing(1),
        borderRadius: "40%",
        "&:hover": {
          color: theme.palette.grey[400],
          backgroundColor: theme.palette.primary.main,
        },
        "&.disabled": {
          cursor: "default",
          color: theme.palette.grey[600],
        },
        "&.selected": {
          color: theme.palette.grey[200],
        },
      },
    },
  },
}));

function AccountsList({ accounts }) {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(0);
  const accountsPerPage = 5;
  const pagesVisited = pageNumber * accountsPerPage;
  const pageCount = Math.ceil(accounts.accounts.length / accountsPerPage);
  const changePage = ({ selected }) => setPageNumber(selected);

  const displayAccounts = accounts.accounts
    .slice(pagesVisited, pagesVisited + accountsPerPage)
    .map((acc) => {
      return <AccountListItem key={acc.id} account={acc} />;
    });

  return (
    <>
      {accounts.accounts && accounts.accounts.length ? (
        <>
          {displayAccounts}
          <Grid item xs={10} className={classes.paginationContainer}>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
            />
          </Grid>
        </>
      ) : (
        <Grid item xs={11}>
          <Typography align="center">
            Add PKH to check account balance
          </Typography>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { accounts } = state;
  return { accounts };
};

export default connect(mapStateToProps)(AccountsList);
