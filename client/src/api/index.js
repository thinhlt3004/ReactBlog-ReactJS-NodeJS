import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();

const API_URL = 'http://localhost:8800/api';



axiosJWT.interceptors.request.use(
    async (config) => {
        const token = JSON.parse(localStorage.getItem('token'));
        //console.log(token.accessToken);
        let currentDate = new Date(); 
        const decodedToken = jwt_decode(token.accessToken);
        if (decodedToken.exp * 1000  < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["Authorization"] = "Bearer " + data.accessToken;
        }
        return config;   
    },
    (error) => {
      return Promise.reject(error);
    }
);
const refreshToken = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const res = await axios.post(`${API_URL}/auth/refresh`, { token: token.refreshToken });
      const tokens = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      }
      if(localStorage.getItem('token') !== null){
        localStorage.removeItem('token');
      }
      localStorage.setItem('token', JSON.stringify(tokens));
      return tokens;
    } catch (err) {
      console.log(err);
    }
};
export const fetchPosts = (payload) => axiosJWT.get(`${API_URL}/post/${payload}`,{
    headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
});



export const fetchPostByID = (payload) => axiosJWT.get(`${API_URL}/post/${payload}`,{
    headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})


export const fetchAllCategories = () => axiosJWT.get(`${API_URL}/category/`,{
    headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})


export const fetchCurrenUser = () => axiosJWT.get(`${API_URL}/user/`,{
    headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})



export const registerUser = (payload) => axios.post(`${API_URL}/auth/register`, payload);

export const loginUser = (payload) => axios.post(`${API_URL}/auth/login`, payload);


export const createPost = (payload) => axiosJWT.post(`${API_URL}/post`, payload,{
  headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})


export const deletePost = (payload) => axiosJWT.delete(`${API_URL}/post/${payload}`,{
  headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})

export const updatePost = (payload) => axiosJWT.put(`${API_URL}/post/${payload.id}`, payload.data,{
  headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})

export const updateUser = (payload) => axiosJWT.put(`${API_URL}/user/${payload.id}`, payload.data,{
  headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})


export const searchData = (payload) => axiosJWT.get(`${API_URL}/post/find/${payload}`,{
  headers: {Authorization :`Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`}
})