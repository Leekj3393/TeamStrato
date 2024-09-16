import { createActions, handleActions } from "redux-actions"


const initialState = [];

const GET_LIST = 'salary/GET_LIST';
const GET_SEARCH = 'salary/GET_SEARCH';
const GET_MEMBER = 'salary/GET_MEMBER';
const GET_SCH = 'salary/GET_SCH';
const GET_REINCOME = 'salary/GET_REINCOME';
const POST_SAL = 'salary/POST_SAL';

export const {salary : { getList ,getSearch , getMember , getSch , getReincome , postSal}} = createActions({
    [GET_LIST] : res => res.data,
    [GET_SEARCH] : res => res,
    [GET_MEMBER] : res => res,
    [GET_SCH] : res => res.data,
    [GET_REINCOME] : res => res,
    [POST_SAL] : res => res,
});

const SalaryReducer = handleActions({
    [GET_LIST] : (state , { payload }) => ({ list : payload }),
    [GET_SEARCH] : (state , { payload }) => ({ searchEmp : payload}),
    [GET_MEMBER] : (state , {payload}) => ({member : payload}),
    [GET_SCH] : (State , { payload }) => ({sch : payload}),
    [GET_REINCOME] : (state , { payload }) => ({...state , reIncome : payload }),
    [POST_SAL] : (state , {payload}) => ({save : payload}),
},initialState);

export default SalaryReducer;

