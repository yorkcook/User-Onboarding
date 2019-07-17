import React from "react";

import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

const UserForm = ({ values, errors, touched, isSubmitting }) => {
  return (
    <Form>
      Name:
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="name" />
      Email:
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="text" name="email" placeholder="email" />
      Password:
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="text" name="password" placeholder="password" />
      Agree:
      <Field type="checkbox" name="submit" placeholder="Submit" />
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValue: ({ email, password }) => {
    return {
      name: "",
      email: email || "",
      password: password || "",
      submit: false
    };
  },

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@email.com") {
      setErrors({ email: "Email already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
          window.alert("Some response here");
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
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
