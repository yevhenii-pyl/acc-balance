import React, { useState } from "react";
import { connect } from "react-redux";
import { addAccount } from "../actions/actions";
import { TezosToolkit } from "@taquito/taquito";
import BigNumber from "bignumber.js";
import { v4 as uuidv4 } from "uuid";
import {
  OutlinedInput,
  Button,
  Grid,
  Theme,
  makeStyles,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";

import { validateKey } from "../utils";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5, 2.5),
      color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.common.white,
    },
    "& .MuiInputAdornment-root": {
      color: theme.palette.grey[400],
    },
  },
  addBtn: {
    height: "100%",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
  error: {
    paddingTop: 0,
  },
}));

const MAIN_NET = new TezosToolkit("https://mainnet-node.madfish.solutions");

function SearchBar({ addAccount }) {
  const classes = useStyles();
  const [pkh, setPkh] = useState("");
  const [inputError, setInputError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const onChange = (e) => {
    setPkh(e.target.value);
    setApiError("");
    e.target.value.length > 0
      ? setInputError(validateKey(e.target.value))
      : setInputError("");
  };

  const handleAccountAdding = async () => {
    setSubmitting(true);

    await MAIN_NET.tz
      .getBalance(pkh)
      .then((b) => new BigNumber(b).toNumber())
      .then((balance) =>
        addAccount({ account: { id: uuidv4(), balance, key: pkh } })
      )
      .catch((err) => setApiError("Cannot parse contract id"))
      .finally(() => {
        setSubmitting(false);
        setPkh("");
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <OutlinedInput
            onKeyPress={(e) =>
              e.key === "Enter" && pkh.length === 36 && handleAccountAdding()
            }
            placeholder="Enter your pkh here..."
            className={classes.input}
            fullWidth
            value={pkh}
            onChange={onChange}
            inputProps={{ maxLength: 36 }}
            endAdornment={
              <InputAdornment position="end">
                ({36 - pkh.length})
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            className={classes.addBtn}
            onClick={handleAccountAdding}
            disabled={inputError.length > 0 || submitting || pkh.length === 0}
          >
            {submitting ? <CircularProgress size="1em" /> : "Add"}
          </Button>
        </Grid>
        {inputError.length > 0 && (
          <Grid item xs={11} className={classes.error}>
            <Typography color="error">{inputError}</Typography>
          </Grid>
        )}
        {apiError.length > 0 && (
          <Grid item xs={11} className={classes.error}>
            <Typography color="error">{apiError}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default connect(null, { addAccount })(SearchBar);
