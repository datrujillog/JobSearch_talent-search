import { useEffect, useReducer } from "react";
import "./App.scss";
import { AuthContext } from "./context/auth/authContext";
import { authReducer } from "./context/auth/authReducer";
import { AppRouter } from "./routes/AppRouter";

const init = () => {
  return JSON.parse(localStorage.getItem("user") )||{ logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
