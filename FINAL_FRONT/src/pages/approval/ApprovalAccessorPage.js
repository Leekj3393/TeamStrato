import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';
import { callAppLineDetailAPI, callAppLineInfoAPI } from '../../apis/AppLineAPICalls';
import { callApprovalAccessAPI, callApprovalReturnAPI } from '../../apis/ApprovalAPICalls';
import { callMyPageMemberAPI } from "../../apis/MyPageAPICalls";
import Swal from 'sweetalert2';

function ApprovalAccessorPage () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appDetail } = useSelector(state => state.approvalReducer);
    const { appLineDetail, appLineInfo  } = useSelector(state => state.applineReducer);
    const membersData = useSelector(state => state.myPageReducer.membersData);
    const params = useParams();
    const appCode = params.appCode;
    const memberCode = membersData?.memberCode;

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
    });


    useEffect(
        () => {
            dispatch(callApprovalDetailAPI({appCode}));
            dispatch(callAppLineDetailAPI({appCode}));
            dispatch(callAppLineInfoAPI({appCode, memberCode}));
            dispatch(callMyPageMemberAPI());
        },
        []
    );

    // console.log('appLineDetail:', appLineDetail);
    console.log('membersData:', membersData);
    console.log('memberCode:', memberCode);



    const appLineCode = appLineInfo?.appLineCode;
    console.log('appLineCode:', appLineCode);


    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    const onClickApprovalAccessHandler = (appCode, memberCode) => {
        dispatch(callApprovalAccessAPI({appCode, memberCode}));
        console.log('appCode : ', appCode);
        console.log('appLineCode : ', memberCode);
        // 처리 완료 후 필요한 작업 수행
        Toast.fire({
            icon: 'success',
            title: '결재 승인 처리가 완료되었습니다. 결재 메인페이지로 이동합니다.'
        })
        navigate(`/approval`, {replace : true});
        window.location.reload();
    };
    const onClickApprovalReturnHandler = (appCode, memberCode) => {
        dispatch(callApprovalReturnAPI({appCode, memberCode}));
        // 처리 완료 후 필요한 작업 수행
        Toast.fire({
            icon: 'success',
            title: '결재 반려 처리가 완료되었습니다. 결재 메인페이지로 이동합니다.'
        })
        navigate(`/approval`, {replace : true});
        window.location.reload();
    }

    return (
            <div className={ApprovalCSS}>
                <div className={ApprovalCSS.square}></div>
                <div className={ApprovalCSS.appContentDiv}>
                    <div className={ApprovalCSS.applineInfoBoxDiv2}>
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
                    <div className={ApprovalCSS.appAccessorDiv}>
                        <table className={ApprovalCSS.approvalAccessorTable}>
                            <tbody>
                                <tr className={ApprovalCSS.accessorTr1}>
                                    <th className={ApprovalCSS.col1}>문서번호</th>
                                    <td className={ApprovalCSS.col8}>{appDetail  && appDetail?.appCode}</td>
                                    <th className={ApprovalCSS.col5}>부서</th>
                                    <td className={ApprovalCSS.col9}>{appDetail && appDetail?.member?.department?.deptName}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr2}>
                                    <th className={ApprovalCSS.col2}>구분</th>
                                    <td className={ApprovalCSS.col10}>{appDetail && appDetail?.appType}</td>
                                    <th className={ApprovalCSS.col6}>상태</th>
                                    <td className={ApprovalCSS.col11}>{appDetail && appDetail?.appStatus}</td>
                                    <th className={ApprovalCSS.col7}>등록일</th>
                                    <td className={ApprovalCSS.col12}>{formatDate(appDetail && appDetail?.appRegistDate)}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr3}>
                                    <th className={ApprovalCSS.col3}>제목</th>
                                    <td className={ApprovalCSS.col13}>{appDetail && appDetail?.appTitle}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr4}>
                                    <th className={ApprovalCSS.col4}>내용</th>
                                    <td className={ApprovalCSS.col14}>
                                        {appDetail && appDetail?.appContent}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={ApprovalCSS.registAppLineDiv}>
                            <div className={ApprovalCSS.accessBtn} onClick={() => onClickApprovalAccessHandler(appCode, memberCode)}><img src='../../image/access-btn.png'/></div>
                            <div className={ApprovalCSS.returnBtn} onClick={() => onClickApprovalReturnHandler(appCode, memberCode)}><img src='../../image/deny-btn.png'/></div>
                        </div>
                    </div>
                </div>
            </div> 
    );
            
}

export default ApprovalAccessorPage;