import { useEffect, useState } from "react";
import PartBoardCSS from "../../components/main/PartBoardCSS.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { callMyPageNoticeAPI } from "../../apis/MyPageAPICalls";

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

  return (
    <div className={PartBoardCSS}>
      <div className="partNemo">
        <div className="circlePart"></div>
        <div className="partName">'안전관리'부서 공지사항</div>
        <div className="partInput">
          <input
            className="PartInput"
            type="text"
            // value={searchText}
            placeholder="검색어를 입력하세요"
            style={{ width: '250px', height: '25px' }}
          />
          <div className="searchPart" onClick={handleSearch}>
            검색
          </div>
          <div className="searchPartGul" onClick={handleSearch}>
            글쓰기
          </div>
        </div>
      </div>

      <table className="boardTable">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>등록 날짜</th>
          </tr>
        </thead>
        <tbody>
        {noticeList && noticeList.map((item) => (
  <tr key={item.noticeCode}>
    <td>{item.noticeCode}</td>
    <td>{item.noticeTitle}</td>
    <td>{item.noticeContent}</td>
    <td>{item.noticeRegistDate}</td>
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
