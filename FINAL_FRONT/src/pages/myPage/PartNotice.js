import { useEffect, useState } from "react";
import PartBoardCSS from "../../components/main/PartBoardCSS.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { callMyPageMemberAPI, callMyPageNoticeAPI } from "../../apis/MyPageAPICalls";

function NoticePart() {
  const dispatch = useDispatch();
  const getMyNotice = useSelector((state) => state.myPageNoticeReducer.getMyNotice.data);
  const [currentPage, setCurrentPage] = useState(1);


  const noticeList = getMyNotice && getMyNotice.data; // 데이터 로드 여부 확인
  const pageInfo = getMyNotice && getMyNotice.pageInfo; // 데이터 로드 여부 확인
  
  useEffect(() => {
    dispatch(callMyPageNoticeAPI(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    console.log('myNotice:', getMyNotice);
  }, [getMyNotice]);

  // 게시물을 검색하는 함수
  const handleSearch = () => {
    // 검색 결과를 출력하는 로직을 추가해주세요.
    // 예: 검색어와 게시물 제목을 비교하여 일치하는 게시물을 필터링하여 출력

    // 필터링된 게시물 목록을 반환하거나 상태로 관리해주세요.
    // 예: setFilteredData(filteredData);
  };

  //페이징바

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();


  //
  const membersData = useSelector(state => state.myPageReducer.membersData);

  console.log("membersData", membersData);

  useEffect(() => {
    dispatch(callMyPageMemberAPI());
  }, []);




  //
 const { noticeCode } = useParams();
  const onClickParNoticeCode = (noticeCode) => {
    navigate(`/myPage/PartNoticeContent/${noticeCode}`);
  }

  return (
    <div className={PartBoardCSS}>
      <div className="partNemo">
        <div className="circlePart"></div>
        <div className="partName">
          
        {membersData.department.deptName }
          부서 공지사항</div>

      </div>

      <table className="boardTable">
    <thead>
        <tr>
            <th className="column1">등록 번호</th>
            <th className="column5">제목</th>
            <th className="column3">부서명</th>
            <th className="column4">등록 날짜</th>
        </tr>
    </thead>
    <tbody>
    {noticeList && noticeList.map((item) => (
        <tr key={item.noticeCode} onClick={() => onClickParNoticeCode(item.noticeCode)}>
            <td className="column1">{item.noticeCode}</td>
            <td className="column2">{item.noticeTitle}</td>
            <td className="column3">{item.noticeType}</td>
            <td className="column4">{new Date(item.noticeRegistDate).toISOString().split('T')[0]}</td>

        </tr>
    ))}
    </tbody>
</table>

            {/* 페이징 바 */}
            <div className="pagination">
  {pageInfo && Array.from({ length: pageInfo.maxPage }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>


    </div>
  );
};

export default NoticePart;
