import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "../src/utils/theme";
import Dashboard from "./views/dashboard";
import Layout from "./views/layout";
import Login from "./pages/Login";
import RequireAuth from "./features/auth/RequireAuth";
import MemberList from "./views/Members/MemberList";
import RegisterMember from "./views/Members/RegisterMember";
import MemberFile from "./views/Members/MemberFile";
import CrbInfo from "./views/Members/CrbInfo";
import Contributions from "./views/Accounts/Contributions";
import ApplyLoan from "./views/loans/ApplyLoan";
import Loans from "./views/loans/Loans";
import TodoApp from "./views/Apps/Todo/TodoApp";
import LoanCalculator from "./views/Apps/LoanCalculator";
import Savings from "./views/Accounts/SavingsAccount/Savings";
import Deposits from "./views/Accounts/DepositsAccount/Deposits";
import Profile from "./views/userAccount/Profile";
import Settings from "./views/settings/Settings";


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
                <Route
                  path="/member registration"
                  element={<RegisterMember />}
                />
                <Route
                  path="/member-update/:memberNo"
                  element={<RegisterMember />}
                />
                <Route
                  path="/member-details/:memberNo"
                  element={<MemberFile />}
                />
                <Route path="/crb information" element={<CrbInfo />} />
                {/* accounts links */}
                <Route path="/savings account" element={<Savings />} />
                <Route path="/deposits account" element={<Deposits />} />
                <Route
                  path="/daily contributions"
                  element={<Contributions />}
                />
                {/* loan link */}
                <Route path="/apply loan" element={<ApplyLoan />} />
                <Route path="/view loans" element={<Loans />} />

                {/* Apps Link */}
                <Route path="/todo list" element={<TodoApp />} />
                <Route path="/loan calculator" element={<LoanCalculator />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
