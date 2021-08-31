import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
};


export const getPosts = createActions({
    getPostsRequest: (payload) => payload,
    getPostsSuccess: (payload) => payload,
    getPostsFail : (error) => error,
});


export const createPost = createActions({
    createPostRequest: (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFail : (error) => error,
});

export const deletePost = createActions({
    deletePostRequest: (payload) => payload,
    deletePostSuccess: (payload) => payload,
    deletePostFail : (error) => error,
});


export const updatePost = createActions({
    updatePostRequest: (payload) => payload,
    updatePostSuccess: (payload) => payload,
    updatePostFail : (error) => error,
});