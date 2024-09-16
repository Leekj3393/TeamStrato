import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import AllSchCSS from '../../components/calendar/AllSch.module.css';
import PagingBar from "../../components/common/PagingBar";
import { callAllSchAPI } from "../../apis/CalendarAPICalls";

function AllSch() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allsch }  = useSelector(state => state.calendarReducer);
    const pageInfo = allsch?.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode);
    const department = useSelector(state => state.myPageReducer.membersData.department);


    useEffect(
        () =>
        {
            dispatch(callAllSchAPI({currentPage}));
        },
      [currentPage]
    );

    console.log("currentPage : ",currentPage);
    console.log("캘린더 정보  : ",allsch);

    return(
        <div className={AllSchCSS}>
            <div className={AllSchCSS.schSquare}></div>                  {/* 본문 하얀 네모 */}
            <div className={AllSchCSS.schContent}>
                <div className={AllSchCSS.schTitleCircle}></div>
                <div className={AllSchCSS.schTitle}>
                    전체 일정 조회
                </div>

                <div className={AllSchCSS.schTableInfo}>           {/* 게시글/페이지 정보 */}
                     페이지 {pageInfo?.currentPage} / {pageInfo?.maxPage}
                </div>

                <table className={AllSchCSS.schMainTable}>   {/* 게시판 시작 */}
                    <thead>
                    <tr className={AllSchCSS.schList}>
                        <th className={AllSchCSS.schTitle2}>일정 이름</th>
                        <th className={AllSchCSS.schContent2}>일정 내용</th>
                        <th className={AllSchCSS.schStart}>시작일</th>
                        <th className={AllSchCSS.schEnd}>종료일</th>
                        <th className={AllSchCSS.schWho}>구분</th>
                        <th className={AllSchCSS.schDept}>부서명</th>
                    </tr>
                    </thead>
                    <tbody>
                        {allsch?.data && allsch.data.map((calendar) => (
                            <tr className={AllSchCSS.schLists}>
                                <td className={AllSchCSS.schTitle2}>{calendar.title}</td>
                                <td className={AllSchCSS.schContent2}>{calendar.content}</td>
                                <td className={AllSchCSS.schStart}>{calendar.start}</td>
                                <td className={AllSchCSS.schEnd}>{calendar.end}</td>
                                <td className={AllSchCSS.schWho}>{calendar.division}</td>
                                <td className={AllSchCSS.schDept}>{calendar.deptCode}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>
        </div>
    );
}

export default AllSch;