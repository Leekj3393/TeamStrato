
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { callMyPageMemberAPI, callMyPageNoticeDetailAPI, callMyPageNoticeFileAPI, PRE_URL } from '../../apis/MyPageAPICalls';
import PartBoardCSS from "../../components/main/PartBoardCSS.css"

function PartNoticeContent() {
  const MyNoticeDetail = useSelector(state => state.myPageNoticeReducer.MyNoticeDetail);
  const { noticeCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('MyNoticeDetail:',MyNoticeDetail);
    dispatch(callMyPageNoticeDetailAPI(noticeCode)); // Redux-Thunk 미들웨어를 사용하여 디스패치
  }, [dispatch, noticeCode]);

  useEffect(() => {
    console.log('찍어봐요 공지사항 숲 MyNoticeDetail:', MyNoticeDetail);
  }, [MyNoticeDetail]);


//파일 조회하기
const MyNoticeFile = useSelector(state => state.myPageNoticeReducer.getMyNoticeFile);

useEffect(() => {
  dispatch(callMyPageNoticeFileAPI(noticeCode)); // 첨부된 파일 정보 불러오기
}, [dispatch, noticeCode]);

useEffect(() => {
  console.log('찍어봐요 파일 숲 MyNoticeFile:', MyNoticeFile);
}, [MyNoticeFile]);  // MyNoticeFile을 종속성 배열에 추가



  //내보내기 api

  useEffect(() => {
    // JavaScript 키로 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init('cb0cc35d70a18871992e2acb455462d4');
    }
}, []);


  const sendKakaoLink = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: MyNoticeDetail.data.noticeTitle,
        description: MyNoticeDetail.data.noticeContent,
        imageUrl: '이미지 URL', // 메시지에 이미지를 첨부하려면 이미지 URL을 여기에 추가
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
      ],
    });
  };

  const membersData = useSelector(state => state.myPageReducer.membersData);

  console.log("membersData", membersData);

  useEffect(() => {
    dispatch(callMyPageMemberAPI());
  }, []);

  return (
    <div className={PartBoardCSS}>
      <div className="partNemo">
      <div className="circlePart"></div>
        <div className="partName">
          
        {membersData.department.deptName }
          부서 공지사항</div>
      <div className="PartContent">
        {MyNoticeDetail && MyNoticeDetail.data && (
          <table className="noticeTable">
            <tbody>
              <tr>
                <td colSpan="2" className="titleCell">
                  <span className="itemLabel">{MyNoticeDetail.data.noticeType}부서 직원들께 알립니다!</span>
  <img src="/image/kakao내보내기.png" alt="카카오톡 이미지" className="kakaoIcon" onClick={sendKakaoLink}/>
                  <div className="backPartNotice" onClick={() => navigate(-1)}>뒤로가기</div>
                  <span className="itemContent noticeTitle">📢 {MyNoticeDetail.data.noticeTitle}</span>

                </td>
              </tr>
              <tr>
  <td className="columnPartContent">
    <div className="columnPartContent">파일 다운받기</div>
  </td>
  <td>
  {MyNoticeFile && MyNoticeFile.getMyNoticeFile.map((file, index) => (
    <div key={index}>
      <a href={`${PRE_URL}/download/${file.fileName}`} download>{file.fileName}</a>
    </div>
  ))}
</td>

</tr>


              <tr>
                <td colSpan="8" className="contentCell">
                  <span className="itemLabel">내용<br></br></span>
                  <span className="itemContent" style={{ height: '380px' }}>
  {MyNoticeDetail.data.noticeContent}
</span>
                </td>
              </tr>


            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
  
  
  
};

export default PartNoticeContent;
