import React from "react";

import { withFormik, Form, Field } from "formik";
//import axios from "axios";
import * as Yup from "yup";

const UserForm = () => {
  return (
    <Form>
      Name:
      <Field type="text" name="name" placeholder="name" />
      Email:
      <Field type="text" name="email" placeholder="email" />
      Password:
      <Field type="text" name="password" placeholder="password" />
      Agree:
      <Field type="checkbox" name="submit" placeholder="Submit" />
      <button>Submit</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValue: () => {
    return {
      name: "",
      email: "",
      password: "",
      submit: false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(20)
      .required("Name is required"),
    email: Yup.string()
      .min(8, "Email must be at least 8 characters long")
      .max(20)
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters long")
      .max(20)
      .required("Password is required")
  })
})(UserForm);
