import { useMutation } from "react-query";
import axios from "axios";

async function addDocument(documentData: any) {
  const { data } = await axios.post("http://localhost:2302", documentData);
  return data;
}

export const useCreateDocument = () => {
  return useMutation((documentData: any) => addDocument(documentData));
};
