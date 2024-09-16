import jwt_decode from "jwt-decode";

export function decodeJwt() {
    const accessToken = window.localStorage.getItem('accessToken');
    return accessToken && jwt_decode(accessToken);
}

export function isLogin() {
    const token = decodeJwt();
    return !(token === undefined || token === null || token.exp * 1000 < Date.now());
}

export function isAdmin() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'ROLE_ADMIN');
}

export function getMemberId() {
    const token = decodeJwt();
    return (token && token.sub);
}

/* 인사관리자 권한 */
export function isHr() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0]) === 'ROLE_HR'
}

/* 안전관리자 권한 */
export function isSafety() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0]) === 'ROLE_SAFETY'
}

export function isFacilty()
{
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0]) === 'ROLE_FACILITY'
}

export function isPay()
{
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0]) === 'ROLE_PAYROLL'
}

export function isNotice()
{
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0]) === 'ROLE_BOARD'
}