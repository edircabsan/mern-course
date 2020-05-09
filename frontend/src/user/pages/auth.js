import React, { useState, useContext } from "react";

import Input from "../../shared/components/form-elements/input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/form-elements/button";
import { useForm } from "../../shared/hooks/form-hook";
import "./auth.css";
import Card from "../../shared/components/ui-elements/card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send this to the server;
    auth.login();
  };

  const switchModeHandler = (event) => {
    event.preventDefault();
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs, 
          name: {
            value: '', 
            isValid: false
          }
        }
        , false)
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
      <form className="auth-form" onSubmit={authSubmitHandler}>
        <h2>Login Required</h2>
        <hr />

        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
        )}
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
  );
};

export default Auth;
