import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from '../pages/SignUp';
import SignInSide from '../pages/SignIn';



export default function GuestRoutes() {
    return (

        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignInSide />} />
            <Route path="*" element={<Navigate to="signup" replace={true} />} />
        </Routes>

    )
}