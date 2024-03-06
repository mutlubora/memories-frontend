import { useContext, useEffect, useState } from "react";
import { Alert } from "@/shared/components/Alert";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { login } from "./api";
import { AuthContext, useAuthDispatch } from "@/shared/state/context";
import { useNavigate } from "react-router-dom";
export function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      username: undefined,
    }));
  }, [username]);

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      password: undefined,
    }));
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setGeneralError();

    try {
      const response = await login({ username, password });
      dispatch({
        type: "login-success",
        data: response.data,
      });
      navigate("/");
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
              <h1>Login</h1>
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
                type="password"
                id="password"
                label="Password"
                error={errors.password}
                onChange={(event) => setPassword(event.target.value)}
              ></Input>

              {generalError && <Alert styleType="danger">{generalError}</Alert>}

              <div className="text-center">
                <Button
                  disabled={!username || !password}
                  apiProgress={apiProgress}
                >
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
