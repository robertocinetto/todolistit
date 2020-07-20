import React from "react";
import { vars } from "../00.assets/variables";
import Simple from "../04.templates/simple";

import { connect } from "react-redux";

import { signInWithGoogle } from "../firebase/firebase.utils";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

//Material UI imports
import { styled } from "@material-ui/core/styles";
import MuiGrid from "@material-ui/core/Grid";
import MuiCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

import { ReactComponent as Logo } from "../00.assets/logo.svg";

const Card = styled(MuiCard)({
  maxWidth: "350px",
  padding: "20px",
  borderRadius: "4px",
  backgroundColor: vars.contentBg,
});

const Grid = styled(MuiGrid)({
  textAlign: "center",
});

const FormControlLabel = styled(MuiFormControlLabel)({
  textAlign: "left",
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        try {
          await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { currentUser } = this.props;
    const { email, password } = this.state;
    return (
      <Simple>
        <Grid item>
          <Logo />
          <Typography variant="h1" align="center">
            To Do Listit!
          </Typography>
          <Card variant="outlined">
            <CardContent>
              {currentUser && (
                <button
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Sign out
                </button>
              )}
              <Typography variant="h3" align="center">
                Sign up
              </Typography>
              <Typography align="center">
                Let’s create an account so everything won’t fly away!
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  id=""
                  label="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Sign up
                </Button>
                <FormControlLabel
                  control={
                    <Checkbox name="checkedB" color="default" required />
                  }
                  label="You have to accept our Privacy Policy"
                />
                <p>or</p>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={signInWithGoogle}
                >
                  Sign up with Google
                </Button>
              </form>
            </CardContent>
          </Card>
          <FormControlLabel
            control={
              <Switch
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Primary"
          />
        </Grid>
      </Simple>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Home);
