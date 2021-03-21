import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebaseConfig from "../config";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();

  let provider = new firebase.auth.FacebookAuthProvider();
  const [logInUser, setLogInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    isLogIn: "",
    error: "",
    isSignup: "",
    sigunUpMeassage: "",
  });

  const hanldeBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      const passwordLength = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isValid = passwordLength && passwordHasNumber;
    }

    if (isValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };

  const handleSignOut = (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const singnOut = {
          name: "",
          email: "",
          password: "",
          photo: "",
          isLogIn: false,
          isSignup: "",
        };
        setUser(singnOut);
        setLogInUser(singnOut);
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };

  const handleSubmit = (e) => {
    if (newUser && user.password && user.email) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          const { displayName, email, photoURL } = user;
          const singnUpInfo = {
            name: displayName,
            email: email,
            photo: photoURL,
            isLogIn: true,
          };
          setUser(singnUpInfo);
          setLogInUser(singnUpInfo);
          history.replace(from);
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          const singnUpInfo = {
            isSignup: false,
            sigunUpMeassage: errorMessage,
          };
          setUser(singnUpInfo);
          console.log("errorCode", errorCode);
          console.log("error Meassage", errorMessage);
        });
      e.preventDefault();
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          const { displayName, email, photoURL } = user;
          const singInUser = {
            name: displayName,
            email: email,
            photo: photoURL,
            isLogIn: true,
            error: "",
          };

          setUser(singInUser);
          setLogInUser(singInUser);
          history.replace(from);
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          const singInUser = {
            isLogIn: false,
            error: errorMessage,
          };
          setUser(singInUser);
          console.log(errorCode, errorMessage);
        });
      e.preventDefault();
    }
  };

  const handleGoogleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        const { displayName, photoURL, email } = user;
        const GoogleBookUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          isLogIn: true,
          isSignup: true,
        };
        setUser(GoogleBookUser);
        setLogInUser(GoogleBookUser);
        history.replace(from);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handlePassword = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (e.target.name === "ConfirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className="container">
      <h5 className="text-center mt-5 mb-5 text-uppercase text-muted">
        Sign In or Sign UP
      </h5>

      {/* Login form */}

      <form className="mt-5 mb-5 border p-5" onSubmit={hanldeBlur}>
        <div className="form-group form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="newUser"
            onChange={() => setNewUser(!newUser)}
          />
          <label className="form-check-label text-uppercase text-muted ">
            New To here? Sign Up Or Sign here below
          </label>
        </div>
        {newUser && (
          <div className="form-group ">
            <input
              className="form-control"
              type="text"
              onBlur={hanldeBlur}
              name="Name"
              placeholder="Name"
            />
          </div>
        )}

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onBlur={hanldeBlur}
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            onChange={handlePassword}
            onBlur={hanldeBlur}
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {newUser && (
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              onChange={handlePassword}
              onBlur={hanldeBlur}
              name="ConfirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
        )}

        {newUser && password !== confirmPassword && (
          <p className="text-danger">Password doesn't match</p>
        )}

        <div className="form-group">
          <input
            className="btn w-100 btn-primary mt-2 bg-success rounded  text-uppercase border-0"
            type="submit"
            onClick={handleSubmit}
            value={newUser ? "Sign UP " : "Sign In"}
          />
        </div>
        <div className="form-group">
          <input
            className=" btn w-100 btn-info mt-3 bg-danger rounded text-uppercase border-0"
            type="submit"
            onClick={handleSignOut}
            value="sign out"
          />
        </div>

        <p className="text-center font-weight-bold">Or</p>
      </form>

      <button
        className="btn w-100 btn-warning mt-2 bg-success mx-auto  text-uppercase rounded w-50 border-0 text-white"
        onClick={handleGoogleSignIn}
      >
        Login with Google
      </button>

      {user.isLogIn ? (
        <p style={{ color: "green" }}>User Logged In sucessFully</p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}
      {user.isSignup ? (
        <p style={{ color: "green" }}>User Logged In sucessFully</p>
      ) : (
        <p style={{ color: "red" }}>{user.sigunUpMeassage}</p>
      )}
    </div>
  );
}

export default Login;
