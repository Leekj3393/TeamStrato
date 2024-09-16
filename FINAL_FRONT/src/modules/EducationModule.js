import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_EDUCATION = "education/GET_EDUCATION";
const GET_SAFETY = "education/GET_SAFETY";
const GET_DUTY = "education/GET_DUTY";
const GET_EDOTHER = "education/GET_ED_OTHER"
const POST_EDUCATION = "education/POST_EDUCATION";
const GET_EDUCATION_PHOTO = "education/GET_EDUCATION_PHOTO";
const POST_EDUCATION_PHOTO = "education/POST_EDUCATION_PHOTO";

export const { education : {getEducation, getSafety, getDuty, getEdOther, postEducation, getEducationPhoto, postEducationPhoto}} = createActions({
    [GET_EDUCATION] : res => res.data,
    [GET_SAFETY] : res => res.data,
    [GET_DUTY] : res => res.data,
    [GET_EDOTHER] : res => res. data,
    [POST_EDUCATION] : res => res,
    [GET_EDUCATION_PHOTO] : res => res.data,
    [POST_EDUCATION_PHOTO] : res => res,
})

const educationReducer = handleActions(
    {   
        [GET_EDUCATION] : (state, {payload}) => ({edu : payload}),
        [GET_SAFETY] : (state, {payload}) => payload,
        [GET_DUTY] : (state, {payload}) => payload,
        [GET_EDOTHER] : (state, {payload}) => payload, 
        [POST_EDUCATION] : (state, {payload}) => ({eduAdd : payload}),
        [GET_EDUCATION_PHOTO] : (state, {payload}) => ({eduPhoto : payload}),
        [POST_EDUCATION_PHOTO] : (state, {payload}) => ({eduPhotoAdd : payload}),
    }
,initialState)

export default educationReducer;