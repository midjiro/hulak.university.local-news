import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    removeAccount,
    signIn,
    signOut,
    signUp,
    updateAccountInformation,
} from './userAPI';
import { checkActionType } from 'utils';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        pending: false,
        currentUser: null,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(signOut.fulfilled, removeAccount.fulfilled),
                (state) => {
                    state.currentUser = null;
                    state.pending = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    signIn.fulfilled,
                    signUp.fulfilled,
                    updateAccountInformation.fulfilled
                ),
                (state, action) => {
                    state.currentUser = action.payload;
                    state.pending = false;
                }
            )

            .addMatcher(
                (action) => checkActionType(action, 'user', 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'user', 'rejected'),
                (state) => {
                    state.pending = false;
                }
            );
    },
});

export default userReducer.reducer;
