import axios from 'axios';
import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const isAuthSucces = () => {
    axios({
        methd: "GET",
        withCredentials: true,
        url: "http://localhost:4000/user"
    })
        .then(res => {
            return res.data.isAuthenticated;
        }).catch(error => {
            return false
        })

}


const isAuthReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.IS_AUTH:
            return action.payload

        case actionTypes.IS_AUTH_ERROR:
            return action.payload
        default:
            return state.isAuth
    }

}



export default isAuthReducer;