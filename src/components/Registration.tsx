import { useNavigate } from "react-router-dom";

export type User = {
  age: number;
  email: string;
  first_name: string;
  is_premium: boolean;
  last_name: string;
  username: string;
};

type RegistrationProps = {
  onRegister: (user: User) => void;
};

const Registration = (props: RegistrationProps) => {
  const navigate = useNavigate();

  const register = () => {
    const registerUser = async () => {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Sonja",
          password: "BeWPgAT2SFvtrN7",
          password_repeat: "BeWPgAT2SFvtrN7",
          email: "sonja@online.com",
          first_name: "Sonja",
          last_name: "Howard",
          age: 45,
          is_premium: true,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        props.onRegister(result);
        navigate("/login");
        console.log(result);
      } else {
        alert(result.email[0]);
        console.log(result);
      }
    };
    registerUser();
  };

  return (
    <>
      <div>Registration</div>
      <button onClick={() => register()}>Register</button>
    </>
  );
};

export default Registration;
