import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  access: string;
  refresh: string;
};

type LoginProps = {
  onLogin: () => void;
};

const Login = (props: LoginProps) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

  const navigate = useNavigate();

  const onLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Jeremy02",
        password: "BeWPgAT2SFvtrN7",
      }),
    });

    // When logged in successfully, then:
    // 1. store access and refresh token
    // 2. set status of user to be logged in via changing the 'loggedIn' value to true
    // if user can't be logged in, show alert

    if (response.ok) {
      const data: LoginResponse = await response.json();

      // store keys in localstorage!
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      console.log("login", data);

      // change loggedIn status
      props.onLogin();
      // navigate to books screen
      navigate("/books");
    }
  };

  return (
    <>
      <div>Login Screen</div>
      <button onClick={onLogin}>Login</button>
    </>
  );
};

export default Login;
