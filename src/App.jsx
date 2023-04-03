import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Dashboard from "./views/dashboard";
import Layout from "./views/layout";
import Login from "./pages/Login";
import RequireAuth from "./features/auth/RequireAuth";
import MemberList from "./views/Members/MemberList";
import RegisterMember from "./views/Members/RegisterMember";
import MemberFile from "./views/Members/MemberFile";
import CrbInfo from "./views/Members/CrbInfo";
import SavingsAccount from "./views/Accounts/SavingsAccount";
import DepositsAccount from "./views/Accounts/DepositsAccount";
import Contributions from "./views/Accounts/Contributions";



function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* public routes */}

            <Route path="/" element={<Login />} />

            {/* protected routes */}

            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* members links */}
                <Route path="/view members" element={<MemberList />} />
                <Route path="/member registration" element={<RegisterMember />} />
                <Route path="/member file" element={<MemberFile />} />
                <Route path="/crb information" element={<CrbInfo />} />
                  {/* accounts links */}
                <Route path="/savings account" element={<SavingsAccount />} />
                <Route path="/deposits account" element={<DepositsAccount />} />
                <Route path="/add contributions" element={<Contributions />} />

              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
