// import React, { useRef } from "react";
// import LText from "../atoms/LText";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import useOutClick from "@/hooks/useOutClick";

// const apiKey = process.env.NEXT_PUBLIC_MY_API_KEY;

// const AnimalModal = ({
//   className = "",
//   style = {},
//   setIsCategory = null,
//   categoriesData,
// }) => {
//   const categoryRef = useRef();

//   const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`;

//   useOutClick(categoryRef, () => {
//     setIsCategory(false);
//   });

//   return (
//     <div
//       className={`${className} h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-[#00000041] transition-all`}
//     >
//       <div
//         ref={categoryRef}
//         className="w-[350px] rounded-3xl bg-white p-[36px]"
//       >
//         <LText className="text-black bg-white mb-[21px]">Add Animal</LText>
//         <Formik
//           initialValues={{ name: "", category: "", image: null }}
//           validate={(values) => {
//             const errors = {};
//             if (!values.name) {
//               errors.name = "Required";
//             }
//             if (!values.category) {
//               errors.category = "Required";
//             }
//             if (!values.image) {
//               errors.image = "Required";
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             const formData = new FormData();
//             formData.append("name", values.name);
//             formData.append("category", values.category);
//             formData.append("image", values.image);

//             // Simulate form submission
//             setTimeout(() => {
//               alert(
//                 `Animal name: ${values.name}, Category: ${values.category}`
//               );
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {({ isSubmitting, setFieldValue }) => (
//             <Form className="bg-white">
//               <Field
//                 type="text"
//                 name="name"
//                 placeholder="Animal Name"
//                 className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
//               />
//               <ErrorMessage
//                 name="name"
//                 component="div"
//                 className="text-red-500 mb-[10px]"
//               />

//               <Field
//                 as="select"
//                 name="category"
//                 className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
//               >
//                 <option value="" label="Select Category" />
//                 {categoriesData?.length > 0 &&
//                   categoriesData?.map(({ id, category }) => (
//                     <option
//                       key={id}
//                       className="button-red"
//                       value={category}
//                       label={category}
//                     >
//                       <LText className="text-red-400">{category}</LText>
//                     </option>
//                   ))}
//                 {/* <option value="Mammal" label="Mammal" />
//                 <option value="Bird" label="Bird" />
//                 <option value="Reptile" label="Reptile" /> */}
//               </Field>
//               <ErrorMessage
//                 name="category"
//                 component="div"
//                 className="text-red-500 mb-[10px]"
//               />

//               <input
//                 id="image"
//                 name="image"
//                 type="file"
//                 className="bg-[#F2F2F2] rounded-[8px] mb-[20px] w-full px-[14px] py-[16px]"
//                 onChange={(event) =>
//                   setFieldValue("image", event.currentTarget.files[0])
//                 }
//               />
//               <ErrorMessage
//                 name="image"
//                 component="div"
//                 className="text-red-500 mb-[10px]"
//               />

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-black text-white p-[14px] rounded-[8px]"
//               >
//                 Submit
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AnimalModal;

import React, { useRef } from "react";
import LText from "../atoms/LText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useOutClick from "@/hooks/useOutClick";
import axios from "axios"; // We'll use axios for API requests
import { toast } from "react-toastify";

const apiKey = process.env.NEXT_PUBLIC_MY_API_KEY;

const AnimalModal = ({
  className = "",
  style = {},
  setIsCategory = null,
  categoriesData,
  onSubmit,
  mutetepostCategories
}) => {
  const categoryRef = useRef();

  const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`;

  useOutClick(categoryRef, () => {
    setIsCategory(false);
  });

  // Function to handle image upload to imgbb
  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(img_hosting_url, formData);
      if (response.data.success) {
        console.log(response.data.data.url);
        return response.data.data.url; // Return the image URL after successful upload
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const imageUrl = await handleImageUpload(values.image);

    if (imageUrl) {
      const formData = {
        name: values.name,
        category: values.category,
        imageUrl: imageUrl,
      };

      mutetepostCategories(formData);

      toast.success("Form Submitted");
      resetForm();
    } else {
      alert("Image upload failed. Please try again.");
    }

    setSubmitting(false);
  };

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
          onSubmit={handleSubmit}
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
                {/* <option value="Bird" label="Bird" /> */}
                {categoriesData?.length > 0 &&
                  categoriesData?.map(({ id, category }) => (
                    <option key={id} value={category}>
                      {category}
                    </option>
                  ))}
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
