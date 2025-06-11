import API from "../API/apiClient";

export const login = async (data) => API.post("/auth/login", data);
export const user = async(data)=> API.get("/user", data)
export const register = async(data) => API.post("/auth/register", data)