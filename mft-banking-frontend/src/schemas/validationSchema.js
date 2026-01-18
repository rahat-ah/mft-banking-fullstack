import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  fatherFirstName: Yup.string().required("Father's First Name is required"),
  date: Yup.string().required("Date is required"),
  villageName: Yup.string().required("Village Name is required"),
  loanAmount: Yup.number().min(3, "Loan Amount must be at least 3 number amount").required("Loan Amount is required").typeError("Loan Amount must be a number"),
  customerStatus: Yup.string().required("Customer Status is required"),
  loanAuditor:Yup.string().required("Auditor officer name is required")
});

export const paymentValidationSchema = Yup.object().shape({
  paymentAmount: Yup.number().test(
    'len', 
    'Must be at least 2 digits', 
    (val) => val && val.toString().length >= 2
  ).required("Payment Amount is required").typeError("Payment Amount must be a number"),
  paymentDate: Yup.string().required("Payment Date is required")
});

export const registerValidationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^01[0-9]{9}$/, "Mobile number must be 11 digits starting with 01")
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
    secretCode: Yup.string()
      .min(4, "Secret Code must be at least 4 characters")
      .required("Secret Code is required"),
  });

export const loginValidationSchema = Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10,14}$/, "Invalid mobile number")
        .required("Mobile number is required"),
      password: Yup.string().min(6, "Password too short").required("Password is required"),
      secretCode: Yup.string().required("Secret code is required"),

    })

