import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required'),
});

export const authenticatorValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('Code is required'),
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

export const broadcastSMSSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message to be sent is required")
})

export const sendSMSSchema = Yup.object().shape({
  member: Yup.string()
    .required("Member is required"),
  message: Yup.string()
    .required("Message to be sent is required")
})

export const sendMultipleSMSSchema = Yup.object().shape({
  members: Yup.array()
    .required("Member is required"),
  message: Yup.string()
    .required("Message to be sent is required")
})

export const processMemberIdSchema = Yup.object().shape({
  member: Yup.string()
    .required("Member is required"),
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
  payment_amount: Yup.string()
    .required('Minimum amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  payment_date: Yup.string()
    .required("Application date is required"),
})

export const createTodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Task priority is required."),
  status: Yup.string().required("Task status is required."),
  due_date: Yup.string()
    .required("Due date is required")
})

export const AddSavingsSchema = Yup.object().shape({
  account: Yup.string()
    .required("Account is required"),
  received_amount: Yup.string().required("Amount is required"),
  received_date: Yup.string()
    .required("Received date is required"),

})

export const WithdrawSavingsSchema = Yup.object().shape({
  account: Yup.string()
    .required("Account is required"),
  withdrawn_amount: Yup.string().required("Amount is required"),
  withdrawn_date: Yup.string()
    .required("Received date is required"),

})

export const checkStaffDetailsSchema = Yup.object().shape({
  staff: Yup.string()
    .required("Staff name is required"),
})

export const checkBranchDetailsSchema = Yup.object().shape({
  branch: Yup.string()
    .required("Branch name is required"),
})

export const addStaffSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  reports_to: Yup.string()
    .required("Staff name is required"),
  branch: Yup.string()
    .required("Branch is required")

});


export const addBranchSchema = Yup.object().shape({
  full_address: Yup.string()
    .required('Full address is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  phone: Yup.string()
    .required("Phone number is  required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Number is too short")
    .max(10, "Number is too long"),
  location: Yup.string()
    .required('Location is required'),
  status: Yup.string()
    .required("Status is required"),
  manager: Yup.string()
    .required("Manager is required")

});


export const addPermissionGroupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Group name is required'),
  permissions: Yup.array()
    .required('Permissions are required')
});


export const getPermissionGroupSchema = Yup.object().shape({
  group: Yup.string()
    .required('Group name is required'),
});


export const definedCalcSchema = Yup.object().shape({
  loan_product: Yup.string()
    .required("Loan type is required"),
  amount: Yup.string()
    .required('Borrowed amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  term: Yup.string()
    .required('Loan term is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
});


export const customCalcSchema = Yup.object().shape({
  amount: Yup.string()
    .required('Borrowed amount is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  term: Yup.string()
    .required('Loan term is required')
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  rate: Yup.string()
    .required("Interest rate is required")
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
});


export const individualSavings = Yup.object().shape({
  member: Yup.string()
    .required("Member is required"),
})

export const individualDeposits = Yup.object().shape({
  member: Yup.string()
    .required("Member is required"),
})


export const contributionsSchema = Yup.object().shape({
  member: Yup.string()
    .required("Member is required"),
  total_amount: Yup.string()
    .required("Total amount is required")
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  collection_date: Yup.string()
    .required("Collection Date is required"),
  received_by: Yup.string()
    .required("Received by is required"),
  savings: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  deposits: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  loan_interest: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  loan_repayment: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  maintenance_fee: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  late_charges: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  registration_fee: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  loan_processing_fee: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  loan_insurance_fee: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  affidavit_fee: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  loan_form: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  passbook: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),
  general_charges: Yup.string()
    .notRequired()
    .test('is-number', 'Can only be a number', (value) => !value || !isNaN(value)),

})