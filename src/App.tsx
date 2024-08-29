import Daftar from "./pages/Daftar";
import Masuk from "./pages/Masuk";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./helpers/context";
import { RecoilRoot } from "recoil";
import { PrivateRoute, RestrictedRoute } from "./helpers/route";

function App() {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/masuk"
              element={
                <RestrictedRoute>
                  <Masuk />
                </RestrictedRoute>
              }
            />
            <Route
              path="/daftar"
              element={
                <RestrictedRoute>
                  <Daftar />
                </RestrictedRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </RecoilRoot>
  );
}

export default App;
