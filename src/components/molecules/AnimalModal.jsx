import React, { useRef } from "react";
import LText from "../atoms/LText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useOutClick from "@/hooks/useOutClick";

const AnimalModal = ({
  className = "",
  style = {},
  setIsCategory = null,
}) => {
  const categoryRef = useRef();

    useOutClick(categoryRef, () => {
      setIsCategory(false);
    });

  return (
    <div
      className={`${className} h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-[#00000041] transition-all`}
    >
      <div
        ref={categoryRef}
        className="w-[350px] rounded-3xl bg-white p-[36px]"
      >
        <LText className="text-black bg-white mb-[21px]">Add Animal</LText>
        <Formik
          initialValues={{ name: "", category: "", image: null }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.category) {
              errors.category = "Required";
            }
            if (!values.image) {
              errors.image = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("category", values.category);
            formData.append("image", values.image);

            // Simulate form submission
            setTimeout(() => {
              alert(
                `Animal name: ${values.name}, Category: ${values.category}`
              );
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="bg-white">
              <Field
                type="text"
                name="name"
                placeholder="Animal Name"
                className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mb-[10px]"
              />

              <Field
                as="select"
                name="category"
                className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
              >
                <option value="" label="Select Category" />
                <option value="Mammal" label="Mammal" />
                <option value="Bird" label="Bird" />
                <option value="Reptile" label="Reptile" />
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 mb-[10px]"
              />

              <input
                id="image"
                name="image"
                type="file"
                className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 mb-[10px]"
              />

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

export default AnimalModal;
