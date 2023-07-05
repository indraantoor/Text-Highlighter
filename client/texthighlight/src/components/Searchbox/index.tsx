import { useDocumentsData } from "../../hooks/query/useDocumentsData";
import { useState } from "react";

const Searchbox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isError, isLoading, refetch } =
    useDocumentsData(searchQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const errorDetails: any = error;
    const errorMessage: string = errorDetails?.response?.data?.msg;
    return <div>{errorMessage}</div>;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    refetch();
    return;
  }

  function handleChange(e: any) {
    setSearchQuery(e.target.value);
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <div>{data?.msg}</div>
    </>
  );
};

export default Searchbox;
