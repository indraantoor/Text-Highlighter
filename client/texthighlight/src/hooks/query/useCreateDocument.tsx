import { useMutation } from "react-query";
import axios from "axios";
import { IFormData } from "../../components/CreateDocument/interfaces/formDetailsInterface";
import BackendRoutes from "../../constants/backendRoutes";

async function addDocument(documentData: IFormData) {
  const { data } = await axios.post(BackendRoutes.BACKEND_URL, documentData);
  return data;
}

export const useCreateDocument = () => {
  return useMutation((documentData: IFormData) => addDocument(documentData));
};
