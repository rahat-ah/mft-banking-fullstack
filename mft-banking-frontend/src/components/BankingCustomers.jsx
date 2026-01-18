import { useContext, useEffect, useState } from "react";
import PaymentPopup from "./PaymentPopup";
import { useNavigate } from "react-router-dom";
import CustomerSearchBar from "./CustomerSearchBar";
import { UserContext } from "../contextApi/userContext";
import profilePicMaker from "../utils/profilePicMaker";
import getCurrentMonthDue from "../utils/getCurrentMonthDue";
import nameSize from "../utils/nameSize";

function BankingCustomers() {
  const navigate = useNavigate();
  const { hamMenuOpen, getAllCustomers, customerDataBySearch } =
    useContext(UserContext);

  const [customers, setCustomers] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState(false);


  const handlePaymentSuccess = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) =>
        cust._id === updatedCustomer._id ? updatedCustomer : cust
      )
    );
  };

  useEffect(() => {
    if (!customerDataBySearch) {
      const fetchCustomers = async () => {
        const customers = await getAllCustomers();
        setCustomers(customers);
      };
      fetchCustomers();
    } else {
      setCustomers(customerDataBySearch);
    }

  }, [getAllCustomers, customerDataBySearch]);

  

  return (
    <div className="xs:px-2 flex justify-center flex-col items-center ">
      <div
        className={`grid md:gap-8 xs:gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-center items-center relative  ${
          hamMenuOpen ? "xs:mt-2 " : "xs:mt-40 sm:mt-25"
        } `}
      >
        <div
          className="fixed top-0 left-0 
            w-full  
            bg-amber-700 
            z-40 mt-18"
        >
          <CustomerSearchBar />
        </div>

        {customers.length === 0 ? (
          <div className="h-screen w-screen flex justify-center items-center overflow-hidden bg-gray-100">
            <p className="text-gray-700 text-xl font-semibold">No items here</p>
          </div>
        ) : (
          customers.map((customer) => (
            <li
              key={customer._id}
              className=" xs:w-40 md:w-80 bg-amber-400 rounded-2xl relative md:mt-30 xs:mt-12 list-none"
            >
              {customer.profilePhotoUrl ? (
                <img
                  src={customer.profilePhotoUrl}
                  alt="profile-pic"
                  className="xs:w-22 xs:h-22 sm:w-22 sm:h-22 md:w-40 md:h-40 rounded-full absolute xs:-top-10 md:-top-18 xs:left-1/4 border-4 border-white shadow-lg shadow-black object-cover object-center"
                />
              ) : (
                profilePicMaker(
                  customer.firstName,
                  "xs:w-22 xs:h-22 sm:w-22 sm:h-22 md:w-40 md:h-40 rounded-full absolute xs:-top-10 md:-top-18 xs:left-1/4 border-4 border-white shadow-lg shadow-black text-white font-semibold flex items-center justify-center select-none xs:text-4xl md:text-7xl"
                )
              )}

              <div className="xs:w-40 md:w-80 bg-sky-600 text-white w-80 rounded-2xl shadow-lg shadow-stone-700">
                <div className="xs:pt-15 md:pt-25 md:px-4 xs:px-1 md:pb-4 xs:pb-2">
                  <div className="flex justify-between bg-orange-700 p-2 md:mb-2 xs:mb-1">
                    <p className="md:text-lg xs:text-xs font-medium ">ID: {customer.id}</p>
                    <p className="md:text-lg xs:text-xs font-medium ">
                      Date: {customer.date}
                    </p>
                  </div>
                  <div className="bg-green-800 p-2 rounded-t-lg overflow-hidden">
                    <div className="flex justify-center items-center md:gap-3 xs:gap-1 md:mb-2 xs:mb-0">
                      <h1
                        className={`xs:text-lg md:text-2xl md:font-semibold  text-center capitalize md:tracking-wider truncate xs:max-w-19 ${nameSize(
                          customer.firstName
                        )}`}
                      >
                        {customer.firstName}
                      </h1>
                      <p className="xs:text-lg md:text-2xl text-amber-500 md:font-bold">
                        /
                      </p>
                      <h2
                        className={`xs:text-lg md:text-2xl md:font-semibold  text-center capitalize md:tracking-wider truncate ${nameSize(
                          customer.fatherFirstName
                        )}`}
                      >
                        {customer.fatherFirstName}
                      </h2>
                    </div>
                    <div className="flex justify-between items-center capitalize md:mb-2 xs:mb-0 gap-1">
                      <h3 className="md:text-lg xs:text-sm text-gray-300 md:tracking-tight xs:tracking-tighter">
                        gurantor:{" "}
                        <span
                          className={`text-white font-semibold tracking-wide truncate md:inline xs:inline-block xs:max-w-19 ${nameSize(
                            customer.guardianFirstName
                          )}`}
                        >
                          {customer.guardianFirstName}
                        </span>
                      </h3>
                      <h3 className="md:text-lg xs:text-sm text-gray-300 md:tracking-tight xs:tracking-tighter md:flex">
                        village:{" "}
                        <span
                          className={`text-white font-semibold tracking-wide xs:max-w-19 xs:inline-block  truncate ${nameSize(
                            customer.villageName
                          )}`}
                        >
                          {customer.villageName}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="flex md:text-sm xs:text-xs items-center justify-between bg-yellow-300 text-black capitalize p-2 rounded-b-lg md:mb-2 xs:mb-1">
                    <p className="text-stone-600 tracking-tight">
                      loan:{" "}
                      <span className="text-black font-bold tracking-wider ">
                        {customer.loanAmount}
                      </span>
                    </p>
                    <p className="text-stone-600 tracking-tight">
                      monthly profit :{" "}
                      <span className="text-black font-bold tracking-wider">
                        {Number((customer.loanAmount * 0.1).toFixed(1))}
                      </span>
                    </p>
                  </div>

                  <div className="flex md:flex-row xs:flex-col justify-between items-center bg-indigo-900 p-2 md:text-lg xs:text-sm xs:tracking-tighter capitalize md:mb-2 xs:mb-1 rounded-lg">
                    {
                      getCurrentMonthDue(customer).currentDue ?
                      <p className="text-slate-300 xs:mb-1">
                      month's due:{" "}
                      <span className="text-white font-semibold tracking-wide">
                        {getCurrentMonthDue(customer).currentDue  }
                      </span>
                    </p> :
                    <p className="text-slate-300 xs:mb-1">
                      month's Advance:{" "}
                      <span className="text-white font-semibold tracking-wide">
                        {getCurrentMonthDue(customer).currentMonthAdvances  }
                      </span>
                    </p>
                    }
                    
                    <button
                      onClick={() => setSelectCustomer(customer)}
                      className=" text-lg px-3 bg-blue-500 capitalize rounded-full font-bold tracking-wide"
                    >
                      payment
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/banking-customer-details/" + customer._id)
                    }
                    className="text-center bg-slate-600 w-full p-2 text-lg font-bold tracking-wider rounded-full"
                  >
                    Details
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
        {selectCustomer && (
          <PaymentPopup
            isOpen={true}
            onClose={() => setSelectCustomer(null)}
            monthsProfitToPay={selectCustomer.loanAmount * 0.1}
            dueAmount={getCurrentMonthDue(selectCustomer)}
            customerName={selectCustomer.firstName}
            fatherName={selectCustomer.fatherFirstName}
            villageName={selectCustomer.villageName}
            id={selectCustomer._id}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default BankingCustomers;
