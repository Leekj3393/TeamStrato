import { getMemberImage } from "../modules/MemberFileModule";
import { memberdelete } from "../modules/MemberModule";
import { getMember,getMembers, getMembersId, getMembersName, postMembers, putMemberRole, putMemberrequest, putMemberrole, putMembers } from "../modules/MemberModule";
import { getJobdepts } from "../modules/MemberRoleModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/member`;

export const callMemberListAPI = ({ currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/members?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
           
            dispatch(getMembers(result));
        }

    }
}

export const callMemberDetailAPI = ({memberCode}) => {

    const reqeustURL = `${PRE_URL}/members/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(res => res.json());

        if(result.status === 200) {
            
            dispatch(getMember(result));
        }
    }

}

export const callMemberRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/regist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(postMembers(result));
        }
    }
}

export const callMemberUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/update`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(putMembers(result));
        }
    }
}

export const calljobDeptListAPI = () => {

    const reqeustURL = `${PRE_URL}/jobDeptList`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(getJobdepts(result));
        }

    }
}

export const callMemberRoleUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/updaterole`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
           
            dispatch(putMemberrole(result));
        }
    }
}

export const callMemberRequestUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/updateRequest`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
           
            dispatch(putMemberrequest(result));
        }
    }
}

export const callMemberNamesListAPI = ({ search , currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/names/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(getMembers(result));
        }

    }
}

export const callMemberCodesListAPI = ({ search , currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/codes/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(getMembers(result));
        }

    }
}

export const callMemberDeptListAPI = ({ search , currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/department/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(getMembers(result));
        }

    }
}

export const callMemberJobListAPI = ({ search , currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/job/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
           
            dispatch(getMembers(result));
        }

    }
}

export const callMemberDeleteAPI = (memberCode) => {
    
    const requestURL = `${PRE_URL}/delete/${memberCode}`;

    console.log("API memberCode : ", memberCode);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'DELETE'
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(memberdelete(result));
        }

    }
}