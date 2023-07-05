import { useMutation } from "react-query";
import axios from "axios";
import { IFormData } from "../../components/CreateDocument/interfaces/formDetailsInterface";

async function addDocument(documentData: IFormData) {
  const { data } = await axios.post("http://localhost:2302", documentData);
  return data;
}

export const useCreateDocument = () => {
  return useMutation((documentData: IFormData) => addDocument(documentData));
};
