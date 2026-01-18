import BankingOfficers from "./components/BankingOfficers";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import BankingCustomers from "./components/BankingCustomers";
import BankingCustomersDetails from "./components/BankingCustomersDetails";
import DepositDue from "./components/DepositDue";
import AddBankingCustomer from "./components/AddBankingCustomer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import BankingRegister from "./components/BankingRegister";
import LandingPage from "./components/LandingPage";
import BankingLogin from "./components/BankingLogin";
import ProtectedRoute from "./utils/ProtectedRoute";
import BankingOfficerDetails from "./components/BankingOfficerDetails";
import BankingSearchReport from "./components/BankingSearchReport";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/banking-register" element={<BankingRegister />} />
        <Route path="/banking-login" element={<BankingLogin />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-customers"
          element={
            <ProtectedRoute>
              <BankingCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-customer-details/:id"
          element={
            <ProtectedRoute>
              <BankingCustomersDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-deposit-due"
          element={
            <ProtectedRoute>
              <DepositDue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-customer-add"
          element={
            <ProtectedRoute>
              <AddBankingCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-officers"
          element={
            <ProtectedRoute>
              <BankingOfficers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-officer-details/:id"
          element={
            <ProtectedRoute>
              <BankingOfficerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banking-search-report"
          element={
            <ProtectedRoute>
              <BankingSearchReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
