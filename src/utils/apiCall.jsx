import axios from "axios";

async function apiCall(endpoint = "") {
  const uri =
    import.meta.env.VITE_API_URL + endpoint + "?api_key=" + import.meta.env.VITE_API_TOKEN;

  const response = await axios.get(uri);
  return response.data;
}

export default apiCall;
