import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';
import { callAppLineDetailAPI } from '../../apis/AppLineAPICalls';


function ApprovalDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appDetail } = useSelector(state => state.approvalReducer);
    const { appLineDetail } = useSelector(state => state.applineReducer);
    const params = useParams();
    const appCode = params.appCode;
    const appLineCode = params.appLineCode;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(
        () => {
            dispatch(callApprovalDetailAPI({appCode}));
            dispatch(callAppLineDetailAPI({appCode}));
        },
        []
    );



    return (
            <div className={ApprovalCSS}>
                <div className={ApprovalCSS.square}></div>
                <div className={ApprovalCSS.appContentDiv}>
                    <div className={ApprovalCSS.applineInfoBoxDiv}>
                        <table>
                                <thead>
                                    <tr>
                                        <th className={ApprovalCSS.col01}>기안자</th>
                                        <th className={ApprovalCSS.col02}>제1 결재선</th>
                                        <th className={ApprovalCSS.col03}>제2 결재선</th>
                                        <th className={ApprovalCSS.col04}>최종 결재선</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td className={ApprovalCSS.col05}>{appDetail && appDetail?.member?.memberName}</td>
                                    {appLineDetail && appLineDetail?.map((appLine) => (
                                        <td className={ApprovalCSS.col05}>{appLine?.accessor?.memberName}</td>
                                        ))}
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className={ApprovalCSS.col09}>요청</td>
                                        {appLineDetail && appLineDetail?.map((appLine) => (
                                        <td className={ApprovalCSS.col05}>{appLine?.appLineStatus}</td>
                                        ))}
                                    </tr>

                                </tfoot>
                        </table>
                    </div>
                    <div className={ApprovalCSS.appDetailDiv}>
                        <table className={ApprovalCSS.approvalDetailTable}>
                            <tbody>
                                <tr className={ApprovalCSS.accessorTr1}>
                                    <th className={ApprovalCSS.col1}>문서번호</th>
                                    <td className={ApprovalCSS.col8}>{appDetail  && appDetail.appCode}</td>
                                    <th className={ApprovalCSS.col5}>부서</th>
                                    <td className={ApprovalCSS.col9}>{appDetail && appDetail.member?.department?.deptName}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr2}>
                                    <th className={ApprovalCSS.col2}>구분</th>
                                    <td className={ApprovalCSS.col10}>{appDetail && appDetail.appType}</td>
                                    <th className={ApprovalCSS.col6}>상태</th>
                                    <td className={ApprovalCSS.col11}>{appDetail && appDetail.appStatus}</td>
                                    <th className={ApprovalCSS.col7}>등록일</th>
                                    <td className={ApprovalCSS.col12}>{formatDate(appDetail && appDetail.appRegistDate)}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr3}>
                                    <th className={ApprovalCSS.col3}>제목</th>
                                    <td className={ApprovalCSS.col13}>{appDetail && appDetail.appTitle}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr4}>
                                    <th className={ApprovalCSS.col4}>내용</th>
                                    <td className={ApprovalCSS.col14}>
                                        {appDetail && appDetail.appContent}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
            
}

export default ApprovalDetail;