import axios from "axios";
import { getList , getReincome, getSch, getSearch, postSal } from "../modules/SalaryModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/salary`;

export const callMemberSalaryList = ({currentPage = 1}) =>
{
    const requestURL = `${PRE_URL}/list?page=${currentPage}`;

    return async(dispatch , getState) =>
    {
        const result = await fetch(requestURL ,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(resp => resp.json());
        
        if(result.status === 200)
        {
            console.log("[SalaryApi] callMemberSalaryList : {}" , result);
            dispatch(getList(result));
        }
    }

}

export const callEmpSearch = (search) =>
{
    console.log("search : {}", search);
    const requestURL = `${PRE_URL}/search/${search}`;

    return async(dispatch , getState) =>
    {
        const result = await fetch(requestURL).then(resp => resp.json());
        if(result.status === 200)
        {
            console.log("[callEmpSearch] callEmpSearch : {}" , result);
            dispatch(getSearch(result));
        }
    }
}

export const callEmpSchDay = (day , memberCode, {currntPage = 1}) =>
{
    const requestURL = `${PRE_URL}/attendance/${memberCode}?day=${day}&page=${currntPage}`;

    return async(dispatch , getState) =>
    {
        const result = await fetch(requestURL).then(resp => resp.json());
        if(result.status === 200)
        {
            console.log("[callEmpSchDay] callEmpSchDay : {}" , result);
            dispatch(getSch(result));
        }
    }
}

export const callEmpSaveSal = (formData) =>
{
    console.log("formData : " ,formData);
    const requestURL = `${PRE_URL}/regist`;

    return async(dispatch , getState) =>
    {
        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(formData)
        }).then(resp => resp.json());
        if(result.status === 200)
        {
            console.log("[callEmpSchDay] callEmpSchDay : {}" , result);
            console.log("formData : " ,formData);
            dispatch(postSal(result));
        }
    }
}

export const callReIncomeTex = (salary , overTime) =>
{
    const requestURL = `${PRE_URL}/reIncom/${salary}?overTime=${overTime}`;
    
    return async(dispatch , getState) =>
    {
        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(resp => resp.json());
        if(result.status === 200)
        {
            console.log("[callEmpSchDay] callReIncomeTex : {}" , result);
            dispatch(getReincome(result));
        }
    }
}