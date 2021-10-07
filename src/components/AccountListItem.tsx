import React from "react";
import { connect } from "react-redux";
import { deleteAccount } from "../actions/actions";

import {
  Theme,
  makeStyles,
  Grid,
  Button,
  OutlinedInput,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: { marginTop: theme.spacing(1) },
  fieldContainer: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "&:nth-of-type(1)": {
        borderRight: "none",
      },
      "&.Mui-disabled": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.grey[500],
        },
      },
    },
  },
  field: {
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5, 2.5),
      color: theme.palette.grey[400],
    },
  },
  deleteBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    height: "100%",
    marginLeft: theme.spacing(1.5),
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const AccountListItem = ({ account, deleteAccount }) => {
  const classes = useStyles();

  const handleDeletion = () => {
    const { id } = account;

    deleteAccount({ id });
  };

  return (
    <>
      <Grid container className={classes.mainContainer}>
        <Grid item xs={7} className={classes.fieldContainer}>
          <OutlinedInput
            value={account.key}
            disabled
            fullWidth
            className={classes.field}
          />
        </Grid>
        <Grid item xs={3} className={classes.fieldContainer}>
          <OutlinedInput
            value={account.balance}
            disabled
            fullWidth
            className={classes.field}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            className={classes.deleteBtn}
            onClick={handleDeletion}
          >
            <Close />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(null, { deleteAccount })(AccountListItem);
