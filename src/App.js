import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, Browse, Signin, Signup } from "./pages/index";
import { useAuthListener } from "./hooks";
export default function App() {
  const { user } = useAuthListener();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path={ROUTES.SIGN_IN}
          // element={!user ? <Signin /> : <Navigate to={ROUTES.BROWSE} />}
          element={<Signin />}
        ></Route>
        <Route
          exact
          path={ROUTES.SIGN_UP}
          // element={!user ? <Signup /> : <Navigate to={ROUTES.BROWSE} />}
          element={<Signup />}
        ></Route>
        <Route
          exact
          path={ROUTES.BROWSE}
          element={user ? <Browse /> : <Navigate to={ROUTES.SIGN_IN} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HOME}
          element={!user ? <Home /> : <Navigate to={ROUTES.BROWSE} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
