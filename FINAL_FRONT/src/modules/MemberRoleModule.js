import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_MEMBERROLE = "memberRole/GET_MEMBERROLE";
const GET_JOBDEPTS = 'memberRole/GET_JOBDEPTS';

export const { memberRole : { getMemberrole, getJobdepts, }} = createActions ({
    [GET_MEMBERROLE] : res => res.data,
    [GET_JOBDEPTS] : res => res.data,
})

const memberRoleReducer = handleActions(
    {
        [GET_MEMBERROLE] : (state, {payload}) => ({ memberRole : payload }),
        [GET_JOBDEPTS] : (state, {payload}) => ({ jobDept : payload}),
    }
, initialState)

export default memberRoleReducer;