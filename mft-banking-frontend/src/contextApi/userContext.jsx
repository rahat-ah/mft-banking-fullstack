import { createContext , useState } from 'react';
import axios from 'axios';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const [loginFormOpen,setLoginFormOpen] = useState(false);
  const [customerDataBySearch , setCustomerDataBySearch] = useState(null);
  const [isAuthenticated,setIsAuthenticated] = useState(false);


  // getting all customers from backend

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/all-customers`,{withCredentials:true});
      if(!response.data.success){
        throw new Error("Failed to fetch customers");
      }
      return response.data.customers;
      
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }

  }

  const values ={
    hamMenuOpen,setHamMenuOpen ,
    loginFormOpen,setLoginFormOpen,
    getAllCustomers,
    customerDataBySearch,setCustomerDataBySearch,
    isAuthenticated,setIsAuthenticated
  }
  
  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;