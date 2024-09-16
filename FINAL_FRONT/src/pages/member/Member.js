import MemberCSS from './Member.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { callMemberCodesListAPI, callMemberDeptListAPI, callMemberJobListAPI, callMemberListAPI, callMemberNamesListAPI } from '../../apis/MemberAPICalls';
import MemberPagingBar from '../../components/common/MemberPagingBar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MemberSearch from './MemberSearch';
import { callMyPageMemberAPI } from '../../apis/MyPageAPICalls';


function Member() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector((state) => state.memberReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [lengthOfService, setLengthOfService] = useState([]);
    const [workingDays, setWorkingDays] = useState([]);
    /* select option 선택 */
    const [ filter, setFilter ] = useState('memberName');

     /* 검색어 요청시 사용할 값 */
     const [searchParams] = useSearchParams();
     const search = searchParams.get('value');

     /* 로그인한 직원 정보 조회 */
     const { membersData } = useSelector(state => state.myPageReducer);
 
    /* 검색 기능 구현 */
    useEffect(() => {
        if(filter === "memberName") {  
            dispatch(callMemberNamesListAPI({search, currentPage}));
        } else if(filter === "memberCode") {
            dispatch(callMemberCodesListAPI({search, currentPage}));
        } else if(filter === "deptName") {
            dispatch(callMemberDeptListAPI({search, currentPage}));
        } else if(filter === "jobName") {
            dispatch(callMemberJobListAPI({search, currentPage}));
        } else {
            dispatch(callMemberListAPI({currentPage}));
        }
    },
    [currentPage, search, filter]
    );

    /* 근무일수, 근속기간 구현 코드 */
    useEffect(() => {
        if (data) { 
          const hireDates = data.map(member => member.memberHireDate);
            
          const currentDate = new Date();
          const los = hireDates.map(date => {
            const employmentPeriod = getEmploymentPeriod(date, currentDate);
            return Math.floor(employmentPeriod / 365); 
          });
          setLengthOfService(los);
          
          const wd = hireDates.map(date => {
            const workDays = getWorkDays(date, currentDate);
            return workDays;
          });
          setWorkingDays(wd);
        }
      }, [data]);
    
    /* 전체 직원 조회 */
    useEffect(() => {
        dispatch(callMemberListAPI({currentPage}));        
    }, [currentPage]);

    /* 로그인한 직원 정보 조회 */
    useEffect(() => {
        dispatch(callMyPageMemberAPI());
    }, []);

    /* 근무일수 */
    const getWorkDays = (startDate, endDate) => {
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const workDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; //시작일, 종료일 포함 계산
        return workDays;
      };

    /* 근속기간 */
    const getEmploymentPeriod = (startDate, endDate) => {
       
        const start = new Date(startDate);
        const end = new Date(endDate);
        const employmentPeriod = Math.round((end - start) / (1000 * 60 * 60 * 24)); 
        return employmentPeriod;
      };
    
    /* 직원 상세조회 핸들러 */
    const onClickMemberHandler = (memberCode) => {
        navigate(`/member/${memberCode}`);
    };

    /* 직원 등록 핸들러 */
    const onClickMemberRegistHandler = (e) => {
        navigate(`/member/regist`);
    };

    return (
        <>
            <div className="memberListTitle">
                직원 목록
            </div>
            <div className='memberHr'>
                <hr/>
            </div>
            <div className="mbSearch">
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="none">전체</option>
                    <option value="memberName">이름</option>
                    <option value="memberCode">사번</option>
                    <option value="deptName">부서</option>
                    <option value="jobName">직급</option>
                </select>
            </div>
            <div>
                <MemberSearch filter={filter}/>
            </div>
            <div className="mbInsert">
                { membersData?.memberRole?.roleDes === '인사관리자' && <button onClick={onClickMemberRegistHandler}>직원 등록</button> }
            </div>
            <div className='mbTableDiv'>
            <table className='mbTable'>
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan="2">이름</th>
                        <th colSpan="5">기본 정보</th>
                        <th colSpan="2">인사 정보</th>
                        <th colSpan="3">개인 정보</th>
                    </tr>
                    <tr className='mbTableFont'>
                        <th>상태</th>
                        <th>사번</th>
                        <th>입사일</th>
                        <th>근속기간</th>
                        <th>근무일수</th>
                        <th>부서</th>
                        <th>직급</th>
                        <th>이메일</th>
                        <th>성별</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody className="memberTr">
                    {data && data.map((member, index) => (
                        <tr key={member.memberCode}
                            onClick ={ () => onClickMemberHandler(member.memberCode)}
                        >
                            <td>{member.memberName}</td>
                            <td>{member.memberStatus}</td>
                            <td>{member.memberCode}</td>
                            <td>{member.memberHireDate.split("T")[0]}</td>
                            <td>{lengthOfService[index] + "년"}</td>
                            <td>{workingDays[index] + "일"}</td>
                            <td>{member.department.deptName}</td>
                            <td>{member.job.jobName}</td>
                            <td>{member.memberId}</td>
                            <td>{member.gender === 'M' ? '남자' : '여자'}</td>
                            <td>{member.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div>
            {pageInfo && (
                <MemberPagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
            )}
            </div>
            </>
    )
}

export default Member;