import { createActions, handleActions } from 'redux-actions';


const initialState = [];

const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const GET_CATEGORY = 'equipment/GET_CATEGORY';
const GET_MODIFY = 'equipment/GET_MODIFY';
const GET_CATEGORYS = 'equipment/GET_CATEGORYS';
const PUT_MODIFY = 'equipment/PUT_MODIFY';
const PUT_DELETE = 'equipment/PUT_DELETE'; 
const POST_EQUIPMENT = 'equipment/POST_EQUIPMENT';
const POST_APPROVAL = 'equipment/POST_APPROVAL';


export const { equipment : { getEquipments , getEquipment , getCategory , postEquipment , getModify , getCategorys , putModify , putDelete , postApproval} } = createActions({
    [GET_EQUIPMENTS] : res => res.data,
    [GET_EQUIPMENT] : res => res.data,
    [GET_CATEGORY] : res => res.data,
    [GET_MODIFY] : res => res.data,
    [GET_CATEGORYS] : res => res.data,
    [PUT_MODIFY] : res => res,
    [PUT_DELETE] : res => res,
    [POST_EQUIPMENT] : res => res,
    [POST_APPROVAL] : res => res,
});

const equipmentReducer = handleActions({
    [GET_EQUIPMENTS] : (state,{ payload }) => payload,
    [GET_EQUIPMENT] : (state , { payload }) => ({...state ,detail : payload}),
    [GET_CATEGORY] : (state, { payload }) => ({category : payload }),
    [GET_MODIFY] : (state , { payload }) => ({equipments : payload}),
    [GET_CATEGORYS] : (state , { payload }) => ({...state , categorys : payload}),
    [PUT_MODIFY] : (state , { payload }) => ({ modify : payload}),
    [PUT_DELETE] : (state , { payload }) => ({ Edelete : payload}),
    [POST_EQUIPMENT] : (state, { payload }) => ({ regist : payload }),
    [POST_APPROVAL] : (state , { payload }) => ({ registApproval : payload }),
},initialState);

export default equipmentReducer;