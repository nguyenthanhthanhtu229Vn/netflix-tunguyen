import HeaderContainer from "../containers/header";
import FooterContainer from "../containers/footer";
import { Form } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { useContext } from "react/cjs/react.development";
import * as ROUTES from "../constants/routes";
export default function Signup() {
  const navigation = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const isInvalid =
    firstName === "" ||
    password === "" ||
    emailAddress === "" ||
    confirm === "";
  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirm) {
      setError("Password and Confirm not match.");
      setPassword("");
      setConfirm("");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password)
        .then((result) => {
          result.user
            .updateProfile({
              displayName: firstName,
              photoURL: Math.floor(Math.random() * 5) + 1,
            })
            .then(() => {
              navigation(ROUTES.BROWSE);
            });
        })
        .catch((error) => {
          if (
            error.message
              .toString()
              .includes(
                "Firebase: The email address is badly formatted. (auth/invalid-email)."
              )
          ) {
            setEmailAddress("");
            setPassword("");
            setConfirm("");
            setError("Ivalid email or phone number.");
          } else if (
            error.message
              .toString()
              .includes(
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
              )
          ) {
            setError("Your password must contain more than 6 characters.");
          } else if (
            error.message
              .toString()
              .includes(
                "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
              )
          ) {
            setError("The email address is already in use by another account");
          } else {
            setError(error.message);
          }
        });
    }
  };
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignup} method="POST">
            <Form.Input
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email or phone number"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              autoComplete="off"
            />
            <Form.Input
              placeholder="Confirm Password"
              value={confirm}
              onChange={({ target }) => setConfirm(target.value)}
              type="password"
              autoComplete="off"
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already a user?<Form.Link to="/signin"> Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.<a href="#"> Learn more</a>
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
