import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const secret = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const validation = value => {
    for (var i = 0; i < value.length; i++) {
      return value[i] === "" ? false : true;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    switch (action) {
      case "logIn":
        if (validation([email.value])) {
          try {
            const {
              data: { requestSecret }
            } = await requestSecretMutation();

            if (!requestSecret) {
              toast.error("You don't have an account yet, create one");
              setTimeout(() => setAction("signUp"), 3000);
            } else {
              toast.success("Check your email for your login secret");
              await setAction("confirm");
            }
          } catch {
            toast.error("Can't request secret, try again");
          }
        } else {
          toast.error("Email is required");
        }

        break;

      case "signUp":
        if (
          validation([
            email.value,
            username.value,
            firstName.value,
            lastName.value
          ])
        ) {
          try {
            const {
              data: { createAccount }
            } = await createAccountMutation();

            if (!createAccount) {
              toast.error("Can't create account");
            } else {
              toast.success("Account created! Log In now");
              setTimeout(() => setAction("logIn"), 3000);
            }
          } catch {
            toast.error("This username or email is already taken", 3000);
          }
        } else {
          toast.error("All field are required");
        }

        break;

      case "confirm":
        if (validation([secret.value])) {
          try {
            const {
              data: { confirmSecret: token }
            } = await confirmSecretMutation();
            if (token !== "" && token !== undefined) {
              window.location.reload();
              localLogInMutation({ variables: { token } });
            } else {
              throw Error();
            }
          } catch {
            toast.error("Can't confirm secret, check again");
          }
        } else {
          toast.error("Can't confirm secret, check again");
        }
        break;

      default:
        toast.error("What the hell?");
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
