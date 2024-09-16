import { useDispatch, useSelector } from 'react-redux';
import PagingBar from '../../components/common/PagingBar';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { callApprovalMemberInfoAPI, callApprovalReturnedListAPI } from '../../apis/ApprovalAPICalls';
import { useNavigate, useParams } from 'react-router-dom';


function ApprovalReturned() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data, appMember} = useSelector(state => state.approvalReducer);
    const memberCode = appMember?.memberCode;
    const approvals = useSelector(state => state.approvalReducer);
    const pageInfo = approvals.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const totalCount = approvals.data.length; // 총 문서 개수 (수정해야함!!)
    

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(() => {
        dispatch(callApprovalMemberInfoAPI());
    }, 
    []);

    useEffect(() => {
        if(memberCode)
        dispatch(callApprovalReturnedListAPI({memberCode, currentPage}));
    }, 
    [currentPage, memberCode])

    /* 상세페이지로 이동 */
    const onClickDetailHandler = (appCode) => {
        navigate(`../${appCode}`);
    };

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.approvalTitleCircle}></div>
                <div className={ApprovalCSS.appListTableInfo}>
                    반려 문서함
                </div>
                <div className={ApprovalCSS.appListTatbleDiv}>
                    <table className={ApprovalCSS.appListTable}>   {/* 게시판 시작 */}
                        <thead>
                            <tr className={ApprovalCSS.title}>
                                <th className={ApprovalCSS.column1}>결재 코드</th>
                                <th className={ApprovalCSS.column2}>구분</th>
                                <th className={ApprovalCSS.column4}>기안서 제목</th>
                                <th className={ApprovalCSS.column5}>상태</th>
                                <th className={ApprovalCSS.column6}>결재 요청자</th>
                                <th className={ApprovalCSS.column3}>등록일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((approval) => (
                                <tr 
                                    className={ApprovalCSS.lists} 
                                    key={approval.appCode}
                                    onClick={() => onClickDetailHandler(approval.appCode)}
                                >
                                    <td className={ApprovalCSS.column1}>{approval.appCode}</td>
                                    <td className={ApprovalCSS.column2}>{approval.appType}</td>
                                    <td className={ApprovalCSS.column4}>{approval.appTitle}</td>
                                    <td className={ApprovalCSS.column5}>{approval.appStatus}</td>
                                    <td className={ApprovalCSS.column6}>{approval.member?.department?.deptName}팀 / {approval.member?.job?.jobName} / {approval.member?.memberName}</td>
                                    <td className={ApprovalCSS.column3}>{formatDate(approval.appRegistDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default ApprovalReturned;

/* import ApprovalCSS from './Approval.module.css';


function ApprovalReturned() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                전자결재 반려 문서함!
            </div>
        </div>
    );
}

export default ApprovalReturned; */