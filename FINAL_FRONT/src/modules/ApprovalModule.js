import { createActions, handleActions } from "redux-actions";

const initialState = {};


const GET_APP_MEMBER_INFO = 'approval/GET_APP_MEMBER_INFO';
const POST_APPROVAL = 'approval/POST_APPROVAL';
const GET_APPROVALS = 'approval/GET_APPROVALS';
const GET_APPROVAL = 'approval/GET_APPROVAL';
const GET_APPROVAL_WAIT = 'approval/GET_APPROVAL_WAIT';
const GET_APPROVAL_IN_PROGRESS = 'approval/GET_APPROVAL_IN_PROGRESS';
const GET_APPROVAL_ACCESSED = 'approval/GET_APPROVAL_ACCESSED';
const GET_APPROVAL_RETURNED = 'approval/GET_APPROVAL_RETURNED';
const PUT_APPROVAL = 'approval/PUT_APPROVAL';


export const { approval : { getAppMemberInfo, postApproval, getApprovals, getApproval, getApprovalWait, getApprovalInProgress, getApprovalAccessed, getApprovalReturned, putApproval }} = createActions({
    [GET_APP_MEMBER_INFO] : res => res.data,
    [POST_APPROVAL] : res => res,
    [GET_APPROVALS] : res => res.data,
    [GET_APPROVAL] : res => res.data,
    [GET_APPROVAL_WAIT] : res => res.data,
    [GET_APPROVAL_IN_PROGRESS] : res => res.data,
    [GET_APPROVAL_ACCESSED] : res => res.data,
    [GET_APPROVAL_RETURNED] : res => res.data,
    [PUT_APPROVAL] : res => res,
});


const approvalReducer = handleActions (
    {
        [GET_APP_MEMBER_INFO] : (state, {payload}) => ({appMember: payload}),
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
        [GET_APPROVALS] : (state, {payload}) => payload,
        [GET_APPROVAL] : (state, {payload}) => payload,
        [GET_APPROVAL_WAIT] : (state, {payload}) => ({countWait: payload}),
        [GET_APPROVAL_IN_PROGRESS] : (state, {payload}) => ({countInProgress: payload}),
        [GET_APPROVAL_ACCESSED] : (state, {payload}) => ({countAccessed: payload}),
        [GET_APPROVAL_RETURNED] : (state, {payload}) => ({countReturned: payload}),
        [GET_APPROVAL] : (state, {payload}) => ({appDetail: payload}),
        [PUT_APPROVAL] : (state, {payload}) => ({access: payload}),
    }
, initialState);

export default approvalReducer;