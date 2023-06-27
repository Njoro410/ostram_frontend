import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required'),
});


export const memberRegisterSchema = Yup.object().shape({
  names: Yup.string()
    .required('Full Name is required'),
  id_no: Yup.string()
    .required('ID is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  mbr_no: Yup.string()
    .required('Member number is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  residential: Yup.string()
    .required('Residential Area is required'),
  gender: Yup.string()
    .required('Gender is required'),
  phone_no: Yup.string()
    .required("Phone number is  required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Number is too short")
    .max(10, "Number is too long"),
  // email: Yup.string()
  //   .notRequired()
  //   .email('Email is invalid'),
  // kra_pin: Yup.string()
  //   .notRequired(),
  phone_nos: Yup.string()
    // .notRequired()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Number is too short")
    .max(10, "Number is too long")
})



export const loanApplicationSchema = Yup.object().shape({
  member: Yup.string()
    .required("Applicant is required"),
  loan_product: Yup.string()
    .required("Loan type is required"),
  principal_amount: Yup.string()
    .required('Loan amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  late_charge_percentage: Yup.string()
    .required('Late charge percentage is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  status: Yup.string()
    .required("Status is required"),
  payment_frequency: Yup.string()
    .required("Payment frequency is required"),
  grace_period: Yup.string()
    .required("Grace period is required"),
  term: Yup.string()
    .required("Loan term is required"),
  application_date: Yup.string()
    .required("Application date is required"),
  start_date: Yup.string()
    .required("Start date is required"),
  reason: Yup.string()
    .required("Loan reason is required")
})

export const loanProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  description: Yup.string()
    .required("Please provide a description"),
  interest_rate: Yup.string()
    .required('Product rate is required')
    .test('is-number', 'Can only be a whole number or a decimal', (value) => !value || !isNaN(value)),
  min_amount: Yup.string()
    .required('Minimum amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  max_amount: Yup.string()
    .required('Maximum amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  documents: Yup.array()
    .required("Documents are required"),
  interest_type: Yup.string()
    .required("Please select one"),
})

export const checkLoanDocumentSchema = Yup.object().shape({
  loan: Yup.string()
    .required("Loan is required"),
})

export const loanDocumentTypeSchema = Yup.object().shape({
  name: Yup.string()
    .required("Document is required"),
  description: Yup.string()
    .required("Description is required"),
})

export const AddLoanDocumentSchema = Yup.object().shape({
  loan: Yup.string()
    .required("Loan is required"),
  document_type: Yup.string()
    .required("Document type is required"),
  status: Yup.string()
    .required("Document status is required"),
  // file: Yup.mixed()
  //   .required("A file is required")
  //   .test('fileFormat', 'Unsupported file format', (value) => {
  //     return value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type);
  //   })
})

export const PayLoanSchema = Yup.object().shape({
  loan: Yup.string()
    .required("Loan is required"),
  payment_amount: Yup.string()
    .required('Minimum amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  payment_date: Yup.string()
    .required("Application date is required"),
})