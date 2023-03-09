import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Dashboard from "./views/dashboard";
import Layout from "./views/layout";
import Login from "./pages/Login";
// import RequireAuth from "./features/auth/RequireAuth";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}

              <Route path="/login" element={<Login />} />

              {/* protected routes */}
              {/* <Route element={<RequireAuth />}> */}
                <Route path="/dashboard" element={<Dashboard />} />
              {/* </Route> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
