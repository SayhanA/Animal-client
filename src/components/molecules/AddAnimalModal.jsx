import React, { useRef } from "react";
import LText from "../atoms/LText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useOutClick from "@/hooks/useOutClick";

const AddAnimalModal = ({ className = "", style = {}, setAnimal=null }) => {
    const addModalRef = useRef();

    useOutClick(addModalRef, () => {
        setAnimal(false);
    })
    
  return (
    <div
      className={`${className} h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-[#00000041] transition-all`}
    >
      <div ref={addModalRef} className="w-[350px] rounded-3xl bg-white p-[36px]">
        <LText className="text-black bg-white mb-[21px]">Add Category</LText>
        <Formik
          initialValues={{ name: ""}}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white">
              <Field
                type="text"
                name="name"
                placeholder="Name"
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
    </div>
  );
};

export default AddAnimalModal;
