import axios from 'axios';
import { postUrl, userUrl } from '../constants/pathUrl.js';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// do this before all request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPost = (id) => API.get(`${postUrl}/details/${id}`);
export const fetchPosts = (page) => API.get(`${postUrl}?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`${postUrl}/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post(postUrl, newPost);
export const updatePost = (id, updatedPost) => API.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postUrl}/${id}`);
export const likePost = (id) => API.patch(`${postUrl}/${id}/likePost`);

export const signIn = (formData) => API.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => API.post(`${userUrl}/signup`, formData);