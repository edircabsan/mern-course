import React, { useState, useContext } from "react";

import Input from "../../shared/components/form-elements/input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/form-elements/button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./auth.css";
import Card from "../../shared/components/ui-elements/card";
import ErrorModal from "../../shared/components/ui-elements/error-modal";
import LoadingSpinner from "../../shared/components/ui-elements/loading-spinner";
import ImageUpload from "../../shared/components/form-elements/image-upload";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        //NOTHING TO DO
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        //Nothing to do
      }
    }
  };

  const switchModeHandler = (event) => {
    event.preventDefault();
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image:{
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="center">
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <form className="auth-form" onSubmit={authSubmitHandler}>
          <h2>Login Required</h2>
          <hr />

          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload id="image" center onInput={inputHandler} errorText="Please provide an image."/> }
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO SIGNIN"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
