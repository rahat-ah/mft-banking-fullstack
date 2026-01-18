import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../contextApi/userContext";

function CustomerSearchBar() {
  const [lastSearchDetails, setLastSearchDetails] = useState(null);
  const { customerDataBySearch,setCustomerDataBySearch } = useContext(UserContext);
  const {
    handleBlur,
    handleSubmit,
    resetForm,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      dateSearch: "all",
      searchBySegment: "allSegments",
      wordSearch: "",
    },
    onSubmit: (values) => {
      customHandleSearch(values);
    },
  });

  const customHandleSearch = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/search-customers`,
        {
          wordSearch: values.wordSearch,
          dateSearch: values.dateSearch,
          searchBySegment: values.searchBySegment,
        },
        {
          withCredentials:true
        }
      );
      setCustomerDataBySearch(response.data.customers);
    } catch (error) {
      console.log(error);
    }

    setLastSearchDetails(values);
    resetForm();
  };
  const customHandleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateSearch") {
      setFieldValue("dateSearch", value);
      if (value !== "all") setFieldValue("searchBySegment", "allSegments");
    }

    if (name === "searchBySegment") {
      setFieldValue("searchBySegment", value);
      if (value !== "allSegments") setFieldValue("dateSearch", "all");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div
        className="
          flex flex-col sm:flex-row 
          items-center justify-between 
          gap-3
          bg-white/90 backdrop-blur
          rounded-2xl
          shadow-lg
          border border-gray-200
          px-4 py-3
        "
      >
        <form
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              name="dateSearch"
              id="dateSearch"
              className="
                w-full sm:w-24
                px-3 py-2
                rounded-xl
                border border-gray-300
                text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-orange-400
                bg-white
              "
              value={values.dateSearch}
              onChange={(e) => customHandleChange(e)}
              onBlur={handleBlur}
            >
              <option value="all">Date</option>
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* SEGMENT SELECT */}
            <select
              name="searchBySegment"
              id="searchBySegment"
              className="
                w-full sm:w-40
                px-3 py-2
                rounded-xl
                border border-gray-300
                text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-400
                bg-white
              "
              value={values.searchBySegment}
              onChange={(e) => customHandleChange(e)}
              onBlur={handleBlur}
            >
              <option value="allSegments">All Segments</option>
              <option value="A">Segment A</option>
              <option value="B">Segment B</option>
              <option value="C">Segment C</option>
            </select>
          </div>

          {/* RIGHT SEARCH */}
          <div className="flex items-center w-full sm:w-auto gap-2">
            <input
              type="text"
              name="wordSearch"
              id="wordSearch"
              placeholder="Search customer..."
              className="
                flex-1 sm:w-64
                px-4 py-2
                rounded-xl
                border border-gray-300
                text-sm sm:max-w-50 md:min-w-80
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              value={values.wordSearch}
              onBlur={handleBlur}
              onChange={(e) => setFieldValue("wordSearch", e.target.value)}
            />
            <button
              type="submit"
              className="
                px-5 py-2
                rounded-xl
                bg-linear-to-r from-blue-500 to-orange-400
                text-white
                text-sm font-semibold
                hover:scale-105 transition
                shadow-md
              "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {lastSearchDetails && (
        <h4 className="xs:mt-1 md:mt-4 text-white xs:text-xs md:text-base ">
          <span className="bg-blue-500 p-1.5 py-0 rounded-full">{customerDataBySearch.length}</span> Results for: <span>{lastSearchDetails.wordSearch}</span> |
          Date:{" "}
          {lastSearchDetails.dateSearch === "all" ? (
            <span>all</span>
          ) : (
            <span>{lastSearchDetails.dateSearch}</span>
          )}{" "}
          | Segment:{" "}
          {lastSearchDetails.searchBySegment === "allSegments" ? (
            <span>All</span>
          ) : (
            <span>{lastSearchDetails.searchBySegment}</span>
          )}
        </h4>
      )}
    </div>
  );
}

export default CustomerSearchBar;
