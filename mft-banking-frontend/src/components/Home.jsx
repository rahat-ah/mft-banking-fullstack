import { useContext, useEffect, useState } from "react";
import { FaUsers, FaMoneyCheckAlt, FaPlusCircle, FaArrowRight } from "react-icons/fa";
import { FaFileCircleExclamation } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contextApi/userContext";
import getCurrentMonthDue from "../utils/getCurrentMonthDue";
import { getTotalPaymentAmount } from "../utils/getTotalAmount";
import axios from "axios";
import {toast} from "react-toastify"

export default function Home() {
  const [customers,setCustomers]= useState([])
  const [totalCurrentMonthDue,setTotalCurrentMonthDue] = useState(0)
  const [totalCurrentMonthCollection,setTotalCurrentMonthCollection] = useState(0)
  const [bankingCollectionTarget,setBankingCollectionTarget] = useState(0)
  const {getAllCustomers} = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    const fetchCustomer=async()=>{
      const allCustomer = await getAllCustomers();
      setCustomers(allCustomer)
    }
    fetchCustomer()
  },[])

  useEffect(() => {
    const totaldue = customers.reduce((acc, customer) => {
      const { currentDue = 0, currentMonthAdvances = 0 } = getCurrentMonthDue(customer);
      return acc + currentDue - currentMonthAdvances; 
    }, 0);
    const totalCollection = customers.reduce((acc, customer) => {
      const total = getTotalPaymentAmount(customer);
      return acc + total; 
    }, 0);

    const getBankingCollectionTarget = async()=>{
      try {
        const bankingCollectionTarget = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-banking-collection-target`,{
        withCredentials:true});
        
        setBankingCollectionTarget( Number(bankingCollectionTarget.data.bankingTarget))                     

      } catch (error) {
         toast.error(error.response?.data?.message)
         console.log(error)
      }
      
      
    }
    getBankingCollectionTarget()
    setTotalCurrentMonthDue(totaldue);
    setTotalCurrentMonthCollection(totalCollection)
  }, [customers]);




  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-orange-50 to-blue-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-blue-700 leading-tight">
              Smart Loan & Customer
              <span className="text-orange-500"> Management System</span>
            </h1>
            <p className="mt-5 text-gray-600 text-base md:text-lg">
              Easily manage customers, track loans, collect deposits and keep records
              organized in one secure dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button 
              onClick={()=>navigate("/banking-register")}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Get Started
              </button>
              <button 
              onClick={()=>navigate("/banking-customers")}
              className="px-6 py-3 rounded-xl border border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transition">
                View Customers
              </button>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 xs:text-center sm:text-left">
                Month's Overview of <br className="sm:hidden" /> Date: <span className="text-orange-500">{new Date().toISOString().slice(0,10)}</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50">
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-50">
                  <p className="text-sm text-gray-500">Collected amount</p>
                  <p className="text-2xl font-bold text-orange-500">৳{totalCurrentMonthCollection}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50">
                  <p className="text-sm text-gray-500">Total Due</p>
                  <p className="sm:text-2xl xs:text-xl font-bold text-blue-600">৳{totalCurrentMonthDue}</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-50">
                  <p className="text-sm text-gray-500">Target Remaining</p>
                  <p className="sm:text-2xl xs:text-xl font-bold text-orange-500">৳{bankingCollectionTarget-totalCurrentMonthCollection}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-blue-700 mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
          onClick={()=>navigate("/banking-customer-add")}
          className="action-card">
            <FaPlusCircle className="text-3xl text-blue-600" />
            <h3>Add Customer</h3>
            <p>Create new customer profile</p>
          </div>

          <div 
          onClick={()=>navigate("/banking-customers")}
          className="action-card">
            <FaUsers className="text-3xl text-orange-500" />
            <h3>All Customers</h3>
            <p>View & manage customers</p>
          </div>

          <div 
          onClick={()=>navigate("/banking-officers")}
          className="action-card">
            <FaMoneyCheckAlt className="text-3xl text-green-600" />
            <h3>Our officers</h3>
            <p>Know more about our officers</p>
          </div>
          <div 
          onClick={()=>navigate("/banking-search-report")}
          className="action-card">
            <FaFileCircleExclamation className="text-3xl text-red-600" />
            <h3>Banking Search Report</h3>
            <p>All those unpaid customers list</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      {/* <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-700">Recent Activity</h2>
            <button className="flex items-center gap-2 text-sm text-orange-500 hover:underline">
              View All <FaArrowRight />
            </button>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b pb-2">
              <span>Deposit received from Rahim</span>
              <span className="text-orange-500">৳ 5,000</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>New customer added</span>
              <span className="text-blue-600">Karim</span>
            </li>
            <li className="flex justify-between">
              <span>Loan approved</span>
              <span className="text-blue-600">৳ 50,000</span>
            </li>
          </ul>
        </div>
      </section> */}

      {/* Tailwind helpers */}
      <style>{`
        .action-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .action-card h3 {
          font-weight: 600;
          color: #1d4ed8;
        }
        .action-card p {
          font-size: 0.875rem;
          color: #6b7280;
        }
        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px rgba(0,0,0,0.12);
        }
      `}</style>
    </div>
  );
}
