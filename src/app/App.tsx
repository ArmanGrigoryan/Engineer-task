import React, { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from './components/layouts/Default';
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const FilterContext = createContext({} as any);

const App: React.FC = () => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <FilterContext.Provider value={{
        filter,
        filterChangeHandler: (param: string) => setFilter(param),
      }}>
        <DefaultLayout>
          <Routes>
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="*"
              element={<Navigate to="/users" replace />}
            />
          </Routes>
        </DefaultLayout>

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
      </FilterContext.Provider>
    </>
  )
}

export default App;