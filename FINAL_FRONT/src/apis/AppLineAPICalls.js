import {getAppLines, getAppLine, getApplineMembers, getApprovalInfo, postAppline} from "../modules/ApplineModule";
import {getApproval} from "../modules/ApprovalModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/approval`;

// 결재선 선택을 위한 결재정보 조회
export const callApprovalInfoForAppAPI = () => {
    const reqeustURL = `${PRE_URL}/registedApp`;
    return async (dispatch, getState) => {
        const result = await fetch(reqeustURL).then(res => res.json());
        if(result.status === 200) {
            console.log('callApprovalInfoForAppAPI result : ', result);
            dispatch(getApproval(result));
        }
    }
}

// 결재선 선택을 위한 직원목록 조회
export const callMemberListForAppAPI = () => {
    const reqeustURL = `${PRE_URL}/memberList`;
    return async (dispatch, getState) => {
        const result = await fetch(reqeustURL).then(res => res.json());
        if(result.status === 200) {
            console.log('callMemberListForAppAPI result : ', result);
            dispatch(getApplineMembers(result));
        }
    }
}

// 결재선 등록
export const callAppLineInsertAPI = (data, order) => {
    const requestURL = `${PRE_URL}/appline-insert`;

    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data, order),
      }).then((response) => response.json());
      if (result.status === 200) {
        console.log('[AppLineAPICalls] :  callAppLineInsertAPI result : ', result);
        dispatch(postAppline(result));
      };
    };
};

// 결재선 상세 정보 조회
export const callAppLineDetailAPI = ({appCode}) => {
    const reqeustURL = `${PRE_URL}/${appCode}/appLineInfo`;
    return async (dispatch, getState) => {
        const result = await fetch(reqeustURL).then(res => res.json());
        if(result.status === 200) {
            console.log('[AppLineAPICalls] : callAppLineDetailAPI result : ', result);
            dispatch(getAppLines(result));
        };
    };
};

//결재선 코드 찾기!!!!
export const callAppLineInfoAPI = ({appCode, memberCode}) => {
    const reqeustURL = `${PRE_URL}/access/appLineInfo?appCode=${appCode}&memberCode=${memberCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(reqeustURL).then(res => res.json());
        if(result.status === 200) {
            console.log('[AppLineAPICalls] : callAppLineInfoAPI result : ', result);
            dispatch(getAppLine(result));
        };
    };
}