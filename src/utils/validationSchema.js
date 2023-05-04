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