import { useNavigate } from 'react-router-dom';
import NoticeCSS from './Notice.module.css';
import { useEffect, useState } from 'react';

function NoticeSearch({filter}) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    console.log("filter : {}", filter);
    console.log("search : {}", search);

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
           if(filter === "noticeTitle") {
               navigate(`/notice/search/title/search?value=${search}`);
            } else if(filter ==="noticeContent") {
               navigate(`/notice/search/content/search?value=${search}`);
           }
        }
    }

    return (
        <div className={NoticeCSS}>
            <div className={NoticeCSS.noticeSearchDiv}>
                <input 
                    type="text"
                    placeholder='검색'
                    value={search}
                    onChange={onSearchChangeHandler}
                    onKeyUp={onEnterKeyHandler}
                />
            </div>
        </div>
    );
}

export default NoticeSearch;