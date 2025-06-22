"use client"
import axios from 'axios'
import { removeLocalStorage } from '@/lib/utils'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('client_token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
       
    return config
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(error?.message || 'Request failed'))
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });

    if (error.response?.status === 401) {
      removeLocalStorage()
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(error?.message || 'Response failed'))
  }
)

export { api }