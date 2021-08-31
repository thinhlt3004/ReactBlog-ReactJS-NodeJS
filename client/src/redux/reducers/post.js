import { INITIAL_STATE } from './../../constant.js';
import {getType, getPosts, createPost, deletePost, updatePost} from './../actions/postActions.js';

export default function authReducer(state = INITIAL_STATE.posts, action){
    switch(action.type){
        case getType(getPosts.getPostsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getPosts.getPostsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getPosts.getPostsFail):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createPost.createPostRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(createPost.createPostSuccess):
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload],
            };
        case getType(createPost.createPostFail):
            return {
                ...state,
                isLoading: false,
            };
        case getType(deletePost.deletePostRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(deletePost.deletePostSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(i => i._id !== action.payload),
            };
        case getType(deletePost.deletePostFail):
            return {
                ...state,
                isLoading: false,
            };
        case getType(updatePost.updatePostRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(updatePost.updatePostSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.map(i => i._id === action.payload._id ? action.payload : i),
            };
        case getType(updatePost.updatePostFail):
            return {
                ...state,
                isLoading: false,
            };
        default: return state;
    }
}