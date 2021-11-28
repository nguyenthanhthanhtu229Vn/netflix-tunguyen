import HeaderContainer from "../containers/header";
import FooterContainer from "../containers/footer";
import { Form } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { useContext } from "react/cjs/react.development";
import * as ROUTES from "../constants/routes";
export default function Signin() {
  const navigation = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";
  const handleSignIn = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        navigation(ROUTES.BROWSE);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        if (
          error.message
            .toString()
            .includes("Firebase: Error (auth/missing-email).")
        ) {
          setError("Please enter email(or phone number) and password.");
        } else if (
          error.message
            .toString()
            .includes(
              "Firebase: The email address is badly formatted. (auth/invalid-email)."
            )
        ) {
          setError("Ivalid email or phone number.");
        } else if (
          error.message
            .toString()
            .includes(
              "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
            )
        ) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignIn} method="POST">
            <Form.Input
              autoComplete="on"
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
            <Form.Submit disabled={isInvalid} type="submit">
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Netflix?<Form.Link to="/signup"> Sign up now.</Form.Link>
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
