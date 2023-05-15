import MemberCSS from './Member.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { callMemberListAPI } from '../../apis/MemberAPICalls';
import PagingBar from '../../components/common/PagingBar';
import { useNavigate } from 'react-router-dom';


function Member() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector((state) => state.memberReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchOption, setSearchOption] = useState('memberId');
    const [search, setSearch] = useState('');
    
    const onClickMemberHandler = (memberCode) => {
        navigate(`/member/${memberCode}`);
    }

    console.log("data", data);

    useEffect(() => {
        dispatch(callMemberListAPI({currentPage}));
    }, [currentPage]);

    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter') {
            navigate(`/search?value=${search}`);
        }
    }

    return (
        <>
            <div className="memberListTitle">
                직원목록
            </div>
            <div className="mbSearch">
                <select onChange={(e) => setSearchOption(e.target.value)}>
                    <option value="memberId">아이디</option>
                    <option value="memberName">이름</option>
                </select>
            </div>
            <div className="mbSearchBar">
                <input type="text" value={search} onKeyUp={onEnterKeyHandler}/>
            </div>
            <div className="mbInsert">
                <button>직원 등록</button>
            </div>
            <div className='mbTableDiv'>
            <table className='mbTable'>
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan="2">이름</th>
                        <th colSpan="5">기본정보</th>
                        <th colSpan="2">인사정보</th>
                        <th colSpan="3">개인정보</th>
                    </tr>
                    <tr>
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
                <tbody>
                    {data && data.map((member) => (
                        <tr key={member.memberCode}
                            onClick ={ () => onClickMemberHandler(member.memberCode)}
                        >
                            <td>{member.memberName}</td>
                            <td>{member.memberStatus}</td>
                            <td>{member.memberCode}</td>
                            <td>{member.memberHireDate.split("T")[0]}</td>
                            <td>근속기간</td>
                            <td>근무일수</td>
                            <td>{member.department.deptName}</td>
                            <td>{member.job.jobName}</td>
                            <td>{member.memberId}</td>
                            <td>{member.gender}</td>
                            <td>{member.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div>
            {pageInfo && (
                <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
            )}
            </div>
            </>
    )
}

export default Member;