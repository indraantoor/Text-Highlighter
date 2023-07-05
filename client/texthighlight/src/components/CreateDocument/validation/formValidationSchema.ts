import * as yup from "yup";

export const schema = yup.object().shape({
  author: yup.string().required("Author is required"),
  name: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});
