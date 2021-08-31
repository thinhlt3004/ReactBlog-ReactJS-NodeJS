import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './../../api/index.js';
import * as authActions from './../actions/authActions.js';
import * as postActions from './../actions/postActions.js';
function* fetchUser(action){
    try {
        const res = yield call(api.fetchCurrenUser);
        // console.log(res.data);
        yield put(authActions.getUserProccess.getUserSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(authActions.getUserProccess.getUserFail(error));
    }
}

function* checkLogin(action){
    try {
        const res = yield call(api.loginUser, action.payload);
        const tokens = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
        }
        if(localStorage.getItem('token') !== null){
            localStorage.removeItem('token');
        }
        localStorage.setItem('token',JSON.stringify(tokens));
        yield put(authActions.loginProcess.loginSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(authActions.loginProcess.loginFail(error));
    }
}

function* fetchPosts(action){
    try {
        const res = yield call(api.fetchPosts, action.payload);
        yield put(postActions.getPosts.getPostsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(postActions.getPosts.getPostsFail(error));
    }
}

function* createPostProcess(action){
    try {
        const res = yield call(api.createPost, action.payload);
        console.log(res.data);
        yield put(postActions.createPost.createPostSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(postActions.createPost.createPostFail(error));
    }
}
function* deletePostProcess(action){
    try {
        // console.log(action.payload);
        yield call(api.deletePost, action.payload);
        yield put(postActions.deletePost.deletePostSuccess(action.payload));
    } catch (error) {
        console.log(error);
        yield put(postActions.deletePost.deletePostFail(error));
    }
}

function* updatePostProcess(action){
    try {
        const res = yield call(api.updatePost, action.payload);
        yield put(postActions.updatePost.updatePostSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(postActions.updatePost.updatePostFail(error));
    }
}

function* updateCurrentUser(action){
    try {
        const res = yield call(api.updateUser, action.payload);
        yield put(authActions.updateProcess.updateProcessSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(authActions.updateProcess.updateProcessFail(error));
    }
}

function* mySaga(){
    yield takeLatest(authActions.getUserProccess.getUserRequest, fetchUser);
    yield takeLatest(authActions.loginProcess.loginRequest, checkLogin);
    yield takeLatest(postActions.getPosts.getPostsRequest, fetchPosts);
    yield takeLatest(postActions.createPost.createPostRequest, createPostProcess);
    yield takeLatest(postActions.deletePost.deletePostRequest, deletePostProcess);
    yield takeLatest(postActions.updatePost.updatePostRequest, updatePostProcess);
    yield takeLatest(authActions.updateProcess.updateProcessRequest, updateCurrentUser);
}


export default mySaga;