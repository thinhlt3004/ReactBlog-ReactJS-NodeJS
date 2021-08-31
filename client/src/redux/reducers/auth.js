import { INITIAL_STATE } from './../../constant.js';
import {getType, getUserProccess, loginProcess, updateProcess } from './../actions/authActions.js';


export default function authReducer(state = INITIAL_STATE.auth, action){
    switch(action.type){
        case getType(getUserProccess.getUserRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getUserProccess.getUserSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getUserProccess.getUserFail):
            return {
                ...state,
                isLoading: false,
            };
        case getType(loginProcess.loginRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(loginProcess.loginSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: false,
            };
        case getType(loginProcess.loginFail):
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        case getType(updateProcess.updateProcessRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(updateProcess.updateProcessSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: false,
            };
        case getType(updateProcess.updateProcessFail):
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return state; 
    }
}