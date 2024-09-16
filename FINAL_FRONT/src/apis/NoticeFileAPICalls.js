import { getNoticeimage } from "../modules/NoticeFileModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/notice`;

export const callMemberImageAPI = ({noticeCode}) => {

    const reqeustURL = `${PRE_URL}/noticeImage/${noticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] : callMemberImageAPI result : ', result);
            dispatch(getNoticeimage(result));
        }
    }

}