import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  transactions: [],
  loading: false,
  error: null
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...state, user: null, token: null, transactions: [] };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t._id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://wealthflow-api-production.up.railway.app/api');

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const getTransactions = async () => {
    if (!state.token) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await axios.get(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: 'SET_TRANSACTIONS', payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(`${API_URL}/transactions`, transaction, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GlobalContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      getTransactions,
      addTransaction,
      deleteTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
