import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
};


export const getUserProccess = createActions({
    getUserRequest: () => undefined,
    getUserSuccess: (payload) => payload,
    getUserFail : (error) => error,
});


export const loginProcess = createActions({
    loginRequest: (payload) => payload,
    loginSuccess: (payload) => payload,
    loginFail : (error) => error,
});

export const updateProcess = createActions({
    updateProcessRequest: (payload) => payload,
    updateProcessSuccess: (payload) => payload,
    updateProcessFail : (error) => error,
});