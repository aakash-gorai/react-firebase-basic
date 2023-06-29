import React from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePass(event) {
    setPass(event.target.value);
  }
  // console.log(auth?.currentUser?.email);
  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <div>
        <h1>Login Below</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <br />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Password"
          onChange={handleChangePass}
        />
        <br />
        <button className="sign-in-btn" onClick={signIn}>
          Sign In
        </button>
        <br />
        <button className="sign-in-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <br />
        <button className="sign-in-btn" onClick={logOut}>
          Log Out
        </button>
      </div>
    </>
  );
}
export default Auth;
