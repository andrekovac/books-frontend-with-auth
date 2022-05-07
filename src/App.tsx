import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./components/Books";
import Login from "./components/Login";
import Registration, { User } from "./components/Registration";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);

  const [user, setUser] = useState<User>();

  return (
    <div className="App">
      <h1>Welcome to the Books App</h1>
      <div>Hello {user?.first_name}</div>
      {/*
       *
       * 1. Add react-router
       * 2. Let user register.
       * 3. After registration -> redirect user to login page.
       * 2. User logs-in ->
       * 3. As soon as user is logged-in --> redirect user to authenticated view based on 'is_premium'
       *
       */}
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        {loggedIn ? (
          <>
            {isPremium ? (
              <Link to="/premium">Premium</Link>
            ) : (
              <Link to="/books">Books (All)</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {loggedIn ? (
            <>
              <Route path="books" element={<Books />} />
              <Route path="premium" element={<Premium />} />
            </>
          ) : (
            <>
              <Route
                path="login"
                element={
                  <Login
                    onLogin={() => {
                      setLoggedIn(true);
                    }}
                  />
                }
              />
              <Route
                path="register"
                element={
                  <Registration
                    onRegister={(user) => {
                      setUser(user);
                    }}
                  />
                }
              />
            </>
          )}
          <Route path="profile" element={<div>Profile</div>} />
        </Routes>
      </main>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div>Some other div</div>
    </>
  );
};

const Premium = () => {
  return <div>Premium</div>;
};

export default App;
