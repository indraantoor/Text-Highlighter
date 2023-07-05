import { useQuery } from "react-query";
import axios from "axios";

async function fetchDocuments(searchQuery: string) {
  const { data } = await axios.get("http://localhost:2302", {
    params: {
      query: searchQuery,
    },
  });
  return data;
}

export const useDocumentsData = (searchQuery: string) => {
  return useQuery("documents", () => fetchDocuments(searchQuery), {
    enabled: false,
    retry: false,
  });
};
