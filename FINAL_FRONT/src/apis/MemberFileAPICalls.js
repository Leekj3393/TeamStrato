import { getMemberimage } from "../modules/MemberFileModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/member`;

export const callMemberImageAPI = ({memberCode}) => {

    const reqeustURL = `${PRE_URL}/memberImage/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            
            dispatch(getMemberimage(result));
        }
    }

}