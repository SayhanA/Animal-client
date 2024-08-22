import React, { useRef } from "react";
import LText from "../atoms/LText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useOutClick from "@/hooks/useOutClick";
import { toast, ToastContainer } from "react-toastify";

const CategoryModal = ({ className = "", style = {}, setAnimal = null,muteteCategory=null }) => {
  const addModalRef = useRef();

  useOutClick(addModalRef, () => {
    setAnimal(false);
  });

  const handleSubmit = async(values, { setSubmitting }) => {
    toast.error('sldf')
    const response = await muteteCategory(values);
    console.log(response)
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
  };

  return (
    <div
      className={`${className} h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-[#00000041] transition-all`}
    >
      <div
        ref={addModalRef}
        className="w-[350px] rounded-3xl bg-white p-[36px]"
      >
        <LText className="text-black bg-white mb-[21px]">Add Category</LText>
        <Formik
          initialValues={{ category: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.category) {
              errors.category = "Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white">
              <Field
                type="text"
                name="category"
                placeholder="category"
                className="bg-[#F2F2F2] rounded-[8px] mb-[30px] w-full px-[14px] py-[16px]"
              />
              <ErrorMessage className="bg-white" name="email" component="div" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-[14px] rounded-[8px]"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default CategoryModal;
