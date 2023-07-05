import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateDocument } from "../../hooks/query/useCreateDocument";

const schema = yup.object().shape({
  author: yup.string().required("Author is required"),
  name: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const CreateDocument = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading, isError, error } = useCreateDocument();

  const onSubmit = (data: any) => {
    // Handle form submission here
    // Access the form values from the `data` object

    mutate(data);
    reset(); // Reset the form after submission
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const errorDetails: any = error;
    const errorMessage: string = errorDetails?.response?.data?.msg;
    return <div>{errorMessage}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" {...register("author")} />
        {errors.author && <small>{errors.author.message}</small>}
      </div>
      <div>
        <label htmlFor="name">Title:</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <small>{errors.name.message}</small>}
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" {...register("content")}></textarea>
        {errors.content && <small>{errors.content.message}</small>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateDocument;
