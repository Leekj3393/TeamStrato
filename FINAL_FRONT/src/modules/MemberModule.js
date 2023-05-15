import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_MEMBERS = 'member/GET_MEMBERS';
const GET_MEMBER = 'member/GET_MEMBER';
const POST_LOGIN = 'member/POST_LOGIN';
const RESET_MEMBER = 'member/RESET_MEMBER';
const GET_MEMBERSID = 'member/GET_MEMBERSID';
const GET_MEMBERSNAME = 'member/GET_MEMBERSNAME';

export const { member : {getMembers, getMember, postLogin, resetMember, getMembersId, getMembersName }} = createActions({
const POST_MEMBER = 'member/POST_MEMBER';

export const { member : {getMembers, postLogin, resetMember, postMember}} = createActions({
    [GET_MEMBERS] : res => res.data,
    [GET_MEMBER] : res => res.data,
    [POST_LOGIN] : res => res,
    [RESET_MEMBER] : () => {},
    [GET_MEMBERSID] : res => res.data,
    [GET_MEMBERSNAME] : res => res.data,
    [POST_MEMBER] : res => res.data,
});

const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, {payload}) => payload,
        [GET_MEMBER] : (state, {payload}) => payload,
        [POST_LOGIN] : (state, { payload }) => ({ login : payload }),
        [RESET_MEMBER] : (state, action) => initialState
        [GET_MEMBERSID] : (state, {payload}) => payload,
        [GET_MEMBERSNAME] : (state, {payload}) => payload,
        [POST_MEMBER] : (state, {payload}) => ({ member : payload }),
    }
    , initialState);

export default memberReducer;