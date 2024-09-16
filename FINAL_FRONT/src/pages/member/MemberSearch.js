import { useNavigate } from 'react-router-dom';
import MemberSearchCSS from './Member.css';
import { useEffect, useState } from 'react';

function MemberSearch({filter}) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch('');
    }, [filter]); 

    /* 검색어 입력 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    /* Enter키 입력 시 검색 화면으로 넘어가는 이벤트 */
    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter') {
           if(filter === "memberName") {
               navigate(`/member/names/search?value=${search}`);
           } else if(filter ==="memberCode") {
                navigate(`/member/codes/search?value=${search}`);
           } else if(filter ==="deptName") {
                navigate(`/member/department/search?value=${search}`);
           } else if(filter ==="jobName") {
                navigate(`/member/job/search?value=${search}`);
           }
        }
    }

    return (
        <div className="mbSearchBar">
            <input 
                type="text"
                placeholder='검색'
                value={search}
                onChange={onSearchChangeHandler}
                onKeyUp={onEnterKeyHandler}
            />
        </div>
    );
}

export default MemberSearch;