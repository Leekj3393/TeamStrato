import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    callApprovalListAPIForAccessor,
    callApprovalMemberInfoAPI,
    callApprovalsCountAPI
} from '../../apis/ApprovalAPICalls';
import PagingBar from '../../components/common/PagingBar';


function Approval() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, appMember, appDetail, count } = useSelector((state) => state.approvalReducer);
    const memberCode = appMember?.memberCode;
    const approvals = useSelector(state => state.approvalReducer);
    const pageInfo = approvals.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const [appStatus, setAppStatus] = useState('');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }
    useEffect(() => {
        dispatch(callApprovalMemberInfoAPI());
      }, []);
      
      useEffect(() => {
    }, [memberCode]);
    
    useEffect(() => {
        if(memberCode)
        // dispatch(callApprovalsCountAPI({memberCode}))
        dispatch(callApprovalListAPIForAccessor({ memberCode, currentPage }));
      }, [memberCode, currentPage]);
      



    /* 상세페이지로 이동 */
    const onClickDetailHandler = (appCode) => {
        navigate(`../approval/accessor/${appCode}`);
    };
    const onChangeAppStatus = () => {}

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.appInfoBoxDiv}>
                        <div className={ApprovalCSS.WTBox}>
                        결재 대기 문서 개수
                        <div className={ApprovalCSS.ea}><b>{count && count.wait.length}6</b> 개</div>
                    </div>
                    <div className={ApprovalCSS.IPBox}>
                        결재 진행중 문서 개수
                        <div className={ApprovalCSS.ea}><b>{count && count.inProgress.length}1</b> 개</div>
                    </div>
                    <div className={ApprovalCSS.ACBox}>
                        결재 승인 문서 개수
                        <div className={ApprovalCSS.ea}><b>{count && count.accessed.length}0</b> 개</div>
                    </div>
                    <div className={ApprovalCSS.RTBox}>
                        결재 반려 문서 개수
                        <div className={ApprovalCSS.ea}><b>{count && count.returned.length}1</b> 개</div>
                    </div>
                </div>
                <div className={ApprovalCSS.appMainTableInfo}>
                    <h3><b>결재 요청 문서가 {data && data.length} 개 있습니다.</b></h3>
                </div>
                <div className={ApprovalCSS.appListTatbleDiv2}>
                    <table className={ApprovalCSS.appListTable}>   {/* 게시판 시작 */}
                        <thead>
                            <tr className={ApprovalCSS.title}>
                                <th>문서번호</th>
                                <th>기안구분</th>
                                <th>등록일</th>
                                <th>기안서 제목</th>
                                <th>상태</th>
                                <th>결재 요청자</th>
                            </tr>                               {/* 게시글은 한 페이지 당 5개씩!!! */}
                        </thead>
                        <tbody>
                            {data && data.map((approvals) => (
                                <tr 
                                    className={ApprovalCSS.lists} 
                                    key={approvals.appCode}
                                    onClick={() => onClickDetailHandler(approvals.approval.appCode)}
                                >
                                    <td>{approvals.approval?.appCode}</td>
                                    <td>{approvals.approval?.appType}</td>
                                    <td>{formatDate(approvals.approval?.appRegistDate)}</td>
                                    <td>{approvals.approval?.appTitle}</td>
                                    <td>{approvals.approval?.appStatus}</td>
                                    <td>{approvals.approval?.member?.department?.deptName}팀 / {approvals.approval?.member?.job?.jobName} / {approvals.approval?.member?.memberName}</td> 
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

export default Approval;