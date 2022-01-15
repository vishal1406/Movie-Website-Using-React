import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
// import authenticationService from "../../utils/authenticationService";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      email: "",
      password: "",
      loggedIn,
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const url = "http://localhost:7070/api/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.text())
      .then((response) => {
        if (response !== 0) {
          this.setState({
            loggedIn: true,
          });
          //authenticationService.registerSuccessfulLogin()
          sessionStorage.setItem("authenticatedUser", response);
        } else {
          alert("Wrong Credentials Provided");
        }
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser")
      );
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
    const paper = {
      marginTop: "64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };

    const avatar = {
      margin: "16px",
      backgroundColor: "#dc004e",
    };

    const form = {
      width: "100%",
      marginTop: "24px",
    };

    const submit = {
      margin: "24px 0px 16px",
    };

    const { email, password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={paper}>
          <Avatar style={avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={form} noValidate onSubmit={this.submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.changeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!validateForm()}
              style={submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="Signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}
