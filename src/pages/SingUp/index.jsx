import { useEffect, useMemo, useState } from "react";
import { singUp } from "./api";
import { Alert } from "@/shared/components/Alert";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";

export function SingUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();

  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      username: undefined,
    }));
  }, [username]);

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      email: undefined,
    }));
  }, [email]);

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      password: undefined,
    }));
  }, [password]);

  const passwordRepeatError = useMemo(() => {
    if (password && password != passwordRepeat) {
      return "Passwords do not match.";
    }
    return "";
  }, [password, passwordRepeat]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setApiProgress(true);
    setGeneralError();
    try {
      const response = await singUp({
        username,
        email,
        password,
      });
      setSuccessMessage(
        "User is created successfully. Please check your e-mail to activate your account."
      );
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError("Unexpected error occured. Please try again.");
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
          <form className="card" onSubmit={onSubmit}>
            <div className="text-center card-header">
              <h1>Sing Up</h1>
            </div>
            <div className="card-body">
              <Input
                type="text"
                id="username"
                label="Username"
                error={errors.username}
                onChange={(event) => setUsername(event.target.value)}
              ></Input>
              <Input
                type="email"
                id="email"
                label="Email"
                error={errors.email}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
              <Input
                type="password"
                id="password"
                label="Password"
                error={errors.password}
                onChange={(event) => setPassword(event.target.value)}
              ></Input>
              <Input
                type="password"
                id="passwordRepeat"
                label="Password Repeat"
                error={passwordRepeatError}
                onChange={(event) => setPasswordRepeat(event.target.value)}
              ></Input>

              {successMessage && <Alert>{successMessage}</Alert>}

              {generalError && <Alert styleType="danger">{generalError}</Alert>}

              <div className="text-center">
              <Button
                    disabled={!password || password !== passwordRepeat}
                    apiProgress={apiProgress}>
                    Login
              </Button>
               
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
