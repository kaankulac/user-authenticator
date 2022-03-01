import * as actionTypes from './actionTypes';
import axios from 'axios';

const isAuth = () => (dispatch) => {
    axios({
        method:"GET",
        withCredentials:true,
        url:"http://localhost:4000/user"
    })
    .then(res => {
        dispatch({
            type: actionTypes.IS_AUTH,
            payload:res.data
        })

    })
    .catch(err => {
        dispatch({
            type: actionTypes.IS_AUTH_ERROR,
            payload:"error"
        })
    })
}

export default isAuth;