import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI,  callAppLine1InsertAPI, callAppLine2InsertAPI,  callAppLine3InsertAPI, callMemberListForAppAPI, callApprovalInfoForAppAPI } from '../../apis/AppLineAPICalls';
import { callApprovalMemberInfoAPI, callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';
import Swal from 'sweetalert2';

function ApprovalLineRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {appDetail, appMember} = useSelector(state => state.approvalReducer);
    const [expandedItems, setExpandedItems] = useState([]);
    const {regist2, accessors } = useSelector(state => state.applineReducer);
    const appCode = appDetail?.appCode;
    const {memberCode} = useParams();
    const form = {};
    form.accessor = {memberCode};
    form.appLineStatus = 'appWait';
    form.appPriorYn = 'Y';
    form.appOrder = 1;
    
    const form2 = {};
    form2.accessor = {memberCode};
    form2.appLineStatus = 'appWait';
    form2.appPriorYn = 'N';
    form2.appOrder = 2;

    const form3 = {};
    form3.accessor = {memberCode};
    form3.appLineStatus = 'appWait';
    form3.appPriorYn = 'N';
    form3.appOrder = 3;
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
    const [select, setSelect] = useState({});
    const [selected, setSelected] = useState({});

    const [firstAccessor, setFirstAccessor] = useState(null); // 첫 번째 결재선 직원 정보를 저장할 상태 변수
    const [secondAccessor, setSecondAccessor] = useState(null); // 두 번째 결재선 직원 정보를 저장할 상태 변수
    const [finalAccessor, setFinalAccessor] = useState(null); // 세 번째 결재선 직원 정보를 저장할 상태 변수

    /* 선택된 결재선에 대한 조회 */
    useEffect(() => {
        dispatch(callMemberDetailAPI({memberCode}));
        dispatch(callApprovalDetailAPI({appCode}));
        dispatch(callApprovalMemberInfoAPI());
        dispatch(callApprovalInfoForAppAPI({appCode}));
    }, []);


    
    // 부서에 해당하는 동일 직급 직원 조회
    const renderMembers = (dept, jobName) => {
        if (!accessors) return null; // accessors가 undefined인 경우 처리
        
        const members = accessors?.accessor?.filter(
            accessor =>
            accessor?.department?.deptCode === dept?.deptCode &&
            accessor?.job?.jobName === jobName &&
            accessor?.memberCode !== appMember?.memberCode &&
            accessor?.memberCode !== firstAccessor?.memberCode &&
            accessor?.memberCode !== secondAccessor?.memberCode &&
            accessor?.memberCode !== finalAccessor?.memberCode 
            );
            
        if (members?.length === 0) return null;
        
        return (
            <ul>
            {members?.map(member => (
                <li 
                key={member?.memberCode} 
                onClick={e => onClickApplineSelectHandler(e, member)} 
                name='memberCode'
                >
                <div className={ApprovalCSS.contentInfoDiv4}>
                    {member?.memberName}
                </div>
            </li>
            ))}
        </ul>
        );
    };

    // 1. 가장 최근에 'tbl_approval'에 저장된 데이터의 값을 가져와서 form 객체에 저장
    useEffect(() => {
        dispatch(callApprovalDetailAPI({ appCode }));
        dispatch(callMemberDetailAPI({ memberCode }));
        dispatch(callApprovalInfoForAppAPI({ appCode }));
    }, []);

    useEffect(() => {
        if (appDetail && appMember) {
          form.accessor.memberCode = appMember.memberCode;
          // form의 나머지 컬럼들에 고정된 값을 할당
          form.appLineStatus = 'appWait';
          form.appPriorYn = 'Y';
          form.appOrder = 1;
        }
    }, [appDetail, appMember]);

    useEffect(() => {
        if (appDetail && appMember) {
          form2.accessor.memberCode = appMember.memberCode;
          // form의 나머지 컬럼들에 고정된 값을 할당
          form2.appLineStatus = 'appWait';
          form2.appPriorYn = 'N';
          form2.appOrder = 2;
        }
    }, [appDetail, appMember]);

    useEffect(() => {
        if (appDetail && appMember) {
          form3.accessor.memberCode = appMember.memberCode;
          // form의 나머지 컬럼들에 고정된 값을 할당
          form3.appLineStatus = 'appWait';
          form3.appPriorYn = 'N';
          form3.appOrder = 3;
        }
    }, [appDetail, appMember]);
    
    const handleItemClick = (dept, jobName) => {
        const item = { dept, jobName };
        const isExpanded = expandedItems?.some(
            expandedItem =>
            expandedItem?.dept?.deptCode === dept?.deptCode && expandedItem?.jobName === jobName
            );
            
            if (isExpanded) {
                setExpandedItems(expandedItems?.filter(
                    expandedItem => !(expandedItem?.dept?.deptCode === dept?.deptCode && expandedItem?.jobName === jobName)
                    ));
                } else {
                    setExpandedItems([...expandedItems, item]);
                }
            };
            
            useEffect(() => {
                dispatch(callMemberDetailAPI({memberCode}));
                dispatch(callMemberListForAppAPI());
            }, []);
            
/* 서버 api 통신이 성공하면 받은 객체를 regist2 라는 키 값으로 저장한다. 
useEffect에서 해당 값이 변화함이 감지 되면 200번 코드임을 확인한 뒤 alert('상신완료!!!! 전자결재 메인화면으로 이동!!');을 띄운다 */
useEffect(
    () => {
        if(regist2?.status === 200) {    
            Toast.fire({
                icon: 'success',
                title: '결재 상신이 완료되었습니다. 결재 메인페이지로 이동합니다.'
            })
            navigate("/approval", {replace : true});
        } else if(regist2?.state === 400) {
            Toast.fire({
                icon: 'error',
                title: '결재 상신을 실패했습니다.'
            })
            return;
            console.log('form : ', form);
            console.log('regist2 : ', regist2);
        }
    },
    [regist2]
);

    /* 결재 요청 버튼 클릭 시 이벤트 */
    const onClickInsertHandler = () => {
        if (!firstAccessor || !secondAccessor || !finalAccessor 
            || !form.accessor?.memberCode || !form.appPriorYn || !form.appLineStatus
            || !form2.accessor?.memberCode || !form2.appPriorYn || !form2.appLineStatus
            || !form3.accessor?.memberCode || !form3.appPriorYn || !form3.appLineStatus
            ) {
            if (!firstAccessor && !form?.accessor.memberCode) {
                Toast.fire({
                    icon: 'error',
                    title: '제1 결재선을 선택해주세요.'
                  })
                return;
            } else if (!secondAccessor && !form2.accessor.memberCode) {
                Toast.fire({
                    icon: 'error',
                    title: '제2 결재선을 선택해주세요.'
                  })
                return;
            } else if (!finalAccessor && !form3.accessor.memberCode) {
                Toast.fire({
                    icon: 'error',
                    title: '최종 결재선을 선택해주세요.'
                  })
                return;
            } else if ( !form?.appLineStatus) {
                Toast.fire({
                    icon: 'error',
                    title: '결재 상태가 누락되었습니다..'
                  })
                return;
            } else if ( !form?.appPriorYn) {
                Toast.fire({
                    icon: 'error',
                    title: '1전결 여부가 누락되었습니다..'
                  })
                return;
            } else if ( !form2?.appPriorYn) {
                Toast.fire({
                    icon: 'error',
                    title: '2전결 여부가 누락되었습니다..'
                  })
                return;
            } else if ( !form3?.appPriorYn) {
                Toast.fire({
                    icon: 'error',
                    title: '3전결 여부가 누락되었습니다..'
                  })
                return;
            }
        }

        // form에 선택된 멤버의 정보 저장
        form.accessor.memberCode = firstAccessor?.memberCode;
        // form의 나머지 컬럼들에 고정된 값을 할당
        form.appLineStatus = 'appWait';
        form.appPriorYn = 'Y';
        form.appOrder = 1;

        // form2에 선택된 멤버의 정보 저장
        form2.accessor.memberCode = secondAccessor?.memberCode;
        // form2의 나머지 컬럼들에 고정된 값을 할당
        form2.appLineStatus = 'appWait';
        form2.appPriorYn = 'N';
        form2.appOrder = 2;

        // form3에 선택된 멤버의 정보 저장
        form3.accessor.memberCode = finalAccessor?.memberCode;
        // form3의 나머지 컬럼들에 고정.
        form3.appLineStatus = 'appWait';
        form3.appPriorYn = 'N';
        form3.appOrder = 3;

        console.log('form:', form);
        console.log('form2:', form2);
        console.log('form3:', form3);    
    
        dispatch(callAppLineInsertAPI(form, 1));
        dispatch(callAppLineInsertAPI(form2, 2));
        dispatch(callAppLineInsertAPI(form3, 3));
    };

    /* 조직도에서 이름을 클릭하면 결재선으로 선택되는 클릭 이벤트 */
    const onClickApplineSelectHandler = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
        if (!firstAccessor) {
            setFirstAccessor(member);
            if(firstAccessor){
                form.accessor.memberCode = firstAccessor?.memberCode;
            }
        } else if (!secondAccessor) {
            setSecondAccessor(member);
            if(secondAccessor){
                form3.accessor.memberCode = secondAccessor?.memberCode;
            }
        } else {
            setFinalAccessor(member);
            if(finalAccessor){
                form3.accessor.memberCode = finalAccessor?.memberCode;
            }
        }

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    
    /* 조직도에서 클릭한 직원을 결재선 부분에 나타나는 이벤트 */
    const onChangeApplineSelectHandler = (e) => {
        setSelected({
            ...selected,
            [e.target.name] : e.target.value
        });
    };

    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setFirstAccessor(null);
            Toast.fire({
                icon: 'success',
                title: '제1 결재선을 초기화합니다.'
              })
        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler2 = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setSecondAccessor(null);
            Toast.fire({
                icon: 'success',
                title: '제2 결재선을 초기화합니다.'
              })

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler3 = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setFinalAccessor(null);
            Toast.fire({
                icon: 'success',
                title: '최종 결재선을 초기화합니다.'
              })

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.selectApplineDiv}>
                    <div className={ApprovalCSS.memberChartBox}>
                        <div className={ApprovalCSS.memberChartContent}>
                        <div className={ApprovalCSS.contentInfoDiv}>조직도</div>
                        <ul className={ApprovalCSS.memberChartUl}>
                            {accessors?.dept && accessors?.dept?.map(dept => {
                                const uniqueJobNames = new Set();
                                accessors?.accessor?.forEach(accessor => {
                                if (accessor?.department?.deptCode === dept?.deptCode) {
                                    uniqueJobNames.add(accessor?.job?.jobName);
                                }
                                });
                                const jobNames = Array.from(uniqueJobNames);

                                return (
                                <li key={dept?.deptCode}>
                                    <div className={ApprovalCSS.contentInfoDiv2}>
                                        {dept?.deptName}
                                    </div>
                                    <ul>
                                    {jobNames?.map(jobName => {
                                        const isExpanded = expandedItems?.some(
                                        expandedItem =>
                                            expandedItem?.dept?.deptCode === dept?.deptCode &&
                                            expandedItem?.jobName === jobName
                                        );

                                        return (
                                        <li key={`${dept?.deptCode}-${jobName}`} onClick={() => handleItemClick(dept, jobName)}>
                                            {jobName} &gt;
                                            {isExpanded && renderMembers(dept, jobName)}
                                        </li>
                                        );
                                    })}
                                    </ul>
                                </li>
                                );
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={ApprovalCSS.selectedMemberDiv}>
                    <div className={ApprovalCSS.selectedMemberContent}>
                        <div className={ApprovalCSS.contentInfoDiv}>결재선</div>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                기안자
                            </div>
                           <li><div className={ApprovalCSS.contentInfoDiv4}>{appMember && appMember?.job?.jobName} - {appMember && appMember?.memberName}</div></li> 
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제1 결재선
                            </div>
                            {firstAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.firstAccessor}
                                    onChange={onChangeApplineSelectHandler}
                                    onClick={onClickApplineRemoveHandler}
                                    name="memberCode"
                                >
                                    {firstAccessor?.job?.jobName} - {firstAccessor?.memberName}
                                </div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제2 결재선
                            </div>
                            {secondAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.secondAccessor}
                                    onChange={onChangeApplineSelectHandler}
                                    onClick={onClickApplineRemoveHandler2}
                                    name="memberCode"
                                >
                                    {secondAccessor?.job?.jobName} - {secondAccessor?.memberName}
                                </div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                최종 결재선
                            </div>
                            {finalAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.finalAccessor}
                                    onChange={onChangeApplineSelectHandler}
                                    onClick={onClickApplineRemoveHandler3}
                                    name="memberCode"
                                >
                                    {finalAccessor?.job?.jobName} - {finalAccessor?.memberName}
                                </div>
                             </li>
                             )} 
                        </ul>
                    </div>
                </div>
                <div className={ApprovalCSS.registFormDiv2}>

                    <button onClick={onClickInsertHandler}><img src='../image/app-regist-btn.png'></img></button>

                </div>
            </div>
        </div>

    );
}

export default ApprovalLineRegist;