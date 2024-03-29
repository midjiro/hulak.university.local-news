import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Profile } from 'pages/Profile';
import { selectCurrentUser } from 'features/user/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { handleGoogleAuth } from 'features/user/userAPI';
import { Settings } from 'pages/Settings';

export const Router = () => {
    const [user] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(handleGoogleAuth());
    }, [user]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Route>
                <Route path='profile' element={<Profile />}>
                    <Route path='settings' element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
