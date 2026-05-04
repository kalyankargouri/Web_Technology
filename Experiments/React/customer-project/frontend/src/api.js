import axios from "axios";

const API = "http://localhost:3001";

export const getCustomers = (search = "") =>
  axios.get(`${API}/customers?search=${search}`);

export const addCustomer = (data) =>
  axios.post(`${API}/customers`, data);

export const updateCustomer = (id, data) =>
  axios.put(`${API}/customers/${id}`, data);

export const deleteCustomer = (id) =>
  axios.delete(`${API}/customers/${id}`);