import axios from "axios";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Login } from "../Components/Login";
import { loginFailure, loginRequest, loginSuccess } from "../Redux/auth/action";

function LoginPage() {
  const dispatch = useDispatch();
  const { isAuth, isLoading, token, isError } = useSelector(
    (state) => state.auth,
    shallowEqual
  );

  const handleLogin = ({ email, password }) => {
    // fake auth
    const requestAction = loginRequest();
    dispatch(requestAction);
    axios
      .post("https://reqres.in/api/login", {
        email,
        password
      })
      .then((res) => {
        const successAction = loginSuccess(res.data.token);
        dispatch(successAction);
      })
      .catch((err) => {
        const failureAction = loginFailure(err.message);
        dispatch(failureAction);
      });
  };
  if (isAuth) {
    return <Redirect to="/" />;
  }
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <Login handleLogin={handleLogin} />
      {isError && <div> something went wrong </div>}
    </div>
  );
}

export { LoginPage };
