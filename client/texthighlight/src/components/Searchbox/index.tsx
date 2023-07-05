import { useDocumentsData } from "../../hooks/query/useDocumentsData";
import { useState } from "react";
import Document from "../Document/index";

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
  }

  function handleChange(e: any) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        >
          Search
        </button>
      </form>
      <div>{data?.msg}</div>
      <div className="flex-grow overflow-y-auto">
        {data?.data && data?.data?.length > 0 ? (
          <div className="grid gap-4">
            {data?.data?.map((document: any) => (
              <Document
                key={document.id}
                title={document.name}
                author={document.author}
                date={document.date}
                content={document.content}
                searchQuery={data.searchQuery}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Searchbox;
