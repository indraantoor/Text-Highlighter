import { useQuery } from "react-query";
import axios from "axios";
import BackendRoutes from "../../constants/backendRoutes";

async function fetchDocuments(searchQuery: string) {
  const { data } = await axios.get(BackendRoutes.BACKEND_URL, {
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
