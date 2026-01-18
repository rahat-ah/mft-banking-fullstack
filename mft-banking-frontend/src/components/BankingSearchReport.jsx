import { useEffect, useState } from "react";
import axios from "axios";
import SubmitLoder from "../utils/SubmitLoder";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const dummyCustomers = [
  {
    _id: "1",
    fullName: "Rahim Uddin",
    fatherName: "Karim Uddin",
    dueMonth: "Dec 2025",
    dueAmount: 2500,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "2",
    fullName: "Salma Begum",
    fatherName: "Abdul Jalil",
    dueMonth: "Dec 2025",
    dueAmount: 0,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "3",
    fullName: "Hasan Ali",
    fatherName: "Noor Ali",
    dueMonth: "Dec 2025",
    dueAmount: 1800,
    status: "OnDate",
    comments: "12",
  },
  {
    _id: "4",
    fullName: "Jahid Hossain",
    fatherName: "Bashir Hossain",
    dueMonth: "Dec 2025",
    dueAmount: 3200,
    status: "Non-Recovery",
    comments: "12gfhthrturtrthrfh",
  },
  {
    _id: "1ywe",
    fullName: "Rahim Uddin",
    fatherName: "Karim Uddin",
    dueMonth: "Dec 2025",
    dueAmount: 2500,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "2ywyr",
    fullName: "Salma Begum",
    fatherName: "Abdul Jalil",
    dueMonth: "Dec 2025",
    dueAmount: 0,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "3wtret4",
    fullName: "Hasan Ali",
    fatherName: "Noor Ali",
    dueMonth: "Dec 2025",
    dueAmount: 1800,
    status: "OnDate",
    comments: "12",
  },
  {
    _id: "4tuio",
    fullName: "Jahid Hossain",
    fatherName: "Bashir Hossain",
    dueMonth: "Dec 2025",
    dueAmount: 3200,
    status: "Non-Recovery",
    comments: "12gfhthrturtrthrfh",
  },
  {
    _id: "rtyu1",
    fullName: "Rahim Uddin",
    fatherName: "Karim Uddin",
    dueMonth: "Dec 2025",
    dueAmount: 2500,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "rtyu2",
    fullName: "Salma Begum",
    fatherName: "Abdul Jalil",
    dueMonth: "Dec 2025",
    dueAmount: 0,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "rtyu3",
    fullName: "Hasan Ali",
    fatherName: "Noor Ali",
    dueMonth: "Dec 2025",
    dueAmount: 1800,
    status: "OnDate",
    comments: "12",
  },
  {
    _id: "truytyu4",
    fullName: "Jahid Hossain",
    fatherName: "Bashir Hossain",
    dueMonth: "Dec 2025",
    dueAmount: 3200,
    status: "Non-Recovery",
    comments: "12gfhthrturtrthrfh",
  },
  {
    _id: "1gfh",
    fullName: "Rahim Uddin",
    fatherName: "Karim Uddin",
    dueMonth: "Dec 2025",
    dueAmount: 2500,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "2hre5",
    fullName: "Salma Begum",
    fatherName: "Abdul Jalil",
    dueMonth: "Dec 2025",
    dueAmount: 0,
    status: "Paid",
    comments: "12",
  },
  {
    _id: "3hy6i7",
    fullName: "Hasan Ali",
    fatherName: "Noor Ali",
    dueMonth: "Dec 2025",
    dueAmount: 1800,
    status: "OnDate",
    comments: "12",
  },
  {
    _id: "4gfu65",
    fullName: "Jahid Hossain",
    fatherName: "Bashir Hossain",
    dueMonth: "Dec 2025",
    dueAmount: 3200,
    status: "Non-Recovery",
    comments: "12gfhthrturtrthrfh",
  },
];

const statusStyle = {
  paid: {
    badge: "bg-green-100 text-green-700",
    border: "border-green-500",
  },
  unpaid: {
    badge: "bg-red-100 text-green-700",
    border: "border-green-500",
  },
  ondate: {
    badge: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-500",
  },
  "non-recovery": {
    badge: "bg-red-100 text-red-700",
    border: "border-red-500",
  },
};

const sectionBtnBase =
  "px-4 xs:py-0 sm:py-1.5 rounded-full xs:text-xs sm:text-sm font-semibold transition-all duration-200";

const activeBtn =
  "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-md";

const inactiveBtn = "bg-gray-100 text-gray-600 hover:bg-gray-200";

export default function BankingSearchReport() {
  const [loding, setLoding] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [searchReportMonth, setSearchReportMonth] = useState("");
  const [grandTotalSearchReportAmount, setGrandTotalSearchReportAmount] =
    useState(0);
  const [sectionTotalSearchReportAmount, setSectionTotalSearchReportAmount] =
    useState(0);
  const [activeSection, setActiveSection] = useState("ALL");
  const [notes, setNotes] = useState({});
  const [activeNoteId, setActiveNoteId] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalSearchReport = async () => {
      try {
        setLoding(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/get-total-previous-month-due`,
          {
            withCredentials: true,
            params: {
              section: activeSection,
            },
          }
        );

        if (res.data.success) {
          setCustomers(res.data.customers);
          setCustomerCount(res.data.count);
          setGrandTotalSearchReportAmount(res.data.grandTotalPreviousMonthDue);
          setSectionTotalSearchReportAmount(
            res.data.sectionTotalPreviousMonthDue
          );
          setSearchReportMonth(res.data.month);
        }
        setLoding(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchTotalSearchReport();
  }, [activeSection]);

  const handleAddNoteBtn = async() => {
    const filteredData = Object.fromEntries(
      Object.entries(notes).filter(([key, value]) => value !== "")
    );
    const id = Object.keys(filteredData)[0];
    const note = Object.values(filteredData)[0];
    
    try {
      setLoding(true)
      const res =await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/add-due-comment/${id}`,{comment:note},{withCredentials:true});

      console.log(res)
      if (res.data.success) {
       const matchedCustomer = customers.find(cust=> cust._id === id);
       matchedCustomer.comment = res.data.newComment;
       toast.success(res.data.message)
      }
      setLoding(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoding(false)
      console.log(error)
    }
    
    setNotes((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <>
      {loding ? (
        <SubmitLoder />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6 pt-1">
          <h1 className=" text-center xs:text-xl md:text-2xl font-bold xs:tracking-tighter mb-2 text-gray-700">
            Banking Search Report :
            <span className="xs:block sm:inline text-teal-800">
              {searchReportMonth}
            </span>
          </h1>
          <p className="mb-3 text-center xs:text-sm text-gray-700">
            {activeSection === "ALL" && (
              <span className="px-2 py-0.5 bg-green-500 font-bold mr-2 rounded-full text-white">
                {customerCount}
              </span>
            )}
            Total Due Report :{" "}
            <span className="text-black tracking-wider">
              ৳ {grandTotalSearchReportAmount}
            </span>
          </p>
          <div className="sticky top-18 bg-blue-200 z-50 py-2 mb-5 rounded-xl px-0.5">
            <div className="flex xs:justify-between sm:justify-center sm:gap-2 xs:gap-0.5  mb-2 ">
              {["ALL", "A", "B", "C"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`${sectionBtnBase} ${
                    activeSection === sec ? activeBtn : inactiveBtn
                  }`}
                >
                  Section {sec}
                </button>
              ))}
            </div>
            {activeSection !== "ALL" && (
              <p className=" text-center xs:text-sm">
                {activeSection !== "ALL" && (
                  <span className="px-2 py-0.5 bg-green-500 font-bold mr-2 rounded-full text-white">
                    {customerCount}
                  </span>
                )}
                Section {activeSection} Due Report :{" "}
                <span className="text-black tracking-wider">
                  ৳ {sectionTotalSearchReportAmount}
                </span>
              </p>
            )}
          </div>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-linear-to-r from-blue-600 to-orange-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Father Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Due Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Comments
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Add Comment
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map((cust) => (
                  <tr
                    key={cust._id}
                    className="border-b hover:bg-blue-50 transition"
                    onClick={() =>
                      navigate("/banking-customer-details/" + cust._id)
                    }
                  >
                    <td className="px-4 py-3 font-medium capitalize">
                      {cust.customerName}
                    </td>
                    <td className="px-4 py-3 capitalize">{cust.fatherName}</td>
                    <td className="px-4 py-3">{cust.date}</td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      ৳ {cust.totalPreviousMonthDue}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 capitalize rounded-full text-xs font-semibold ${
                          statusStyle[cust.dueStatus]
                        }`}
                      >
                        {cust.dueStatus}
                      </span>
                    </td>

                    <td className="text-xs font-semibold text-red-600 px-2 py-0.5 whitespace-nowrap max-w-30 truncate text-center">
                      {cust.comment || "-"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          placeholder="Notes / comments"
                          className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none flex-1"
                          value={activeNoteId === cust._id ? notes[cust._id] || "" : ""}
                          onClick={(e) =>{ e.stopPropagation()
                            setActiveNoteId(cust._id)
                          }}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [cust._id]: e.target.value,
                            }))
                          }
                          onBlur={() =>{
                            setActiveNoteId(null);
                            setNotes((prev) => ({ ...prev, [cust._id]: "" }))
                          }}
                        />
                        <button
                          className={`px-2 py-1 text-xl font-semibold rounded-md
                          ${
                            !notes[cust._id] || notes[cust._id].trim() === ""
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          } transition`}
                          disabled={!notes[cust._id] || notes[cust._id].trim() === ""}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleAddNoteBtn();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============ MOBILE COMPACT CARD VIEW ============ */}
          <div className="md:hidden space-y-2">
            {customers.map((cust) => (
              <div
                key={cust._id}
                className={`bg-white rounded-lg shadow-sm px-3 py-2
                border-l-4 ${statusStyle[cust.dueStatus].border}`}
                onClick={() =>
                  navigate("/banking-customer-details/" + cust._id)
                }
              >
                {/* Row 1 */}
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-blue-700 truncate">
                    {cust.customerName}{" "}
                    <span className="text-black font-bold">/</span>{" "}
                    {cust.fatherName}
                  </p>

                  <span
                    className={`px-2 py-0.5 capitalize rounded-full text-[11px] font-semibold
            ${statusStyle[cust.dueStatus].badge}`}
                  >
                    {cust.dueStatus}
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                  <span className="text-xs font-semibold text-red-600">
                    ৳ {cust.totalPreviousMonthDue}
                  </span>
                  <span>{cust.date}</span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-2 mt-1">
                  {/* Comments */}
                  {cust.comment && (
                    <span className="text-xs font-semibold text-yellow-400 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap max-w-30 truncate">
                      {cust.comment}
                    </span>
                  )}

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Add note..."
                    className="flex-1 px-2 py-1 text-xs border rounded-md
                    focus:ring-1 focus:ring-orange-500 outline-none"
                    value={activeNoteId === cust._id ? notes[cust._id] || "" : ""}
                    onClick={(e) => {e.stopPropagation()
                      setActiveNoteId(cust._id)
                    }}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [cust._id]: e.target.value,
                      }))
                    }
                    onBlur={() =>{
                      setActiveNoteId(null);
                      setNotes((prev) => ({ ...prev, [cust._id]: "" }))
                    }}
                  />

                  {/* Button */}
                  <button
                    className={`px-3 py-1 text-xs font-semibold rounded-md
                   ${
                     !notes[cust._id] || notes[cust._id].trim() === ""
                       ? "bg-gray-400 cursor-not-allowed"
                       : "bg-blue-600 text-white hover:bg-blue-700"
                   } transition`}
                    disabled={!notes[cust._id] || notes[cust._id].trim() === ""}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleAddNoteBtn();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
