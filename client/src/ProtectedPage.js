import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import isAuth from './redux/actions/authAction';
import { Routes, Route, Navigate } from 'react-router-dom';
import Member from './Member';


export default function ProtectedPage({children}) {
  var data = useSelector(state => state.isAuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    data = dispatch(isAuth());
  })


  return data.isAuthenticated ? children :<div>hihihia</div>
  
}
