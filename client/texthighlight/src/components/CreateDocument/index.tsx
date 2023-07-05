import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateDocument } from "../../hooks/query/useCreateDocument";
import Loading from "../Loading";

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
    return <Loading />;
  }
  if (isError) {
    const errorDetails: any = error;
    const errorMessage: string = errorDetails?.response?.data?.msg;
    return <div>{errorMessage}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4">
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-800 font-medium">
          Author:
        </label>
        <input
          type="text"
          id="author"
          {...register("author")}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.author && (
          <small className="text-red-500">{errors.author.message}</small>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-800 font-medium">
          Title:
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <small className="text-red-500">{errors.name.message}</small>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-800 font-medium">
          Content:
        </label>
        <textarea
          id="content"
          {...register("content")}
          className="border border-gray-300 px-4 py-2 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.content && (
          <small className="text-red-500">{errors.content.message}</small>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateDocument;
