import { getAuthToken } from "../auth";

const createHeaders = () => {
  const token = getAuthToken();

  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

export default createHeaders;
