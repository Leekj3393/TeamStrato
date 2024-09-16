import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import MyPage from "./pages/myPage/MyPage";
import SubLayout from "./layouts/SubLayout";
import Document from "./pages/myPage/Document";
import PartNotice from "./pages/myPage/PartNotice";
import NoticeSubLayout from "./layouts/NoticeSubLayout";
import Notice from "./pages/notice/Notice";
import ApprovalSubLayout from "./layouts/ApprovalSubLayout";
import Approval from "./pages/approval/Approval";
import ApprovalRegist from "./pages/approval/ApprovalRegist";
import ApprovalWait from "./pages/approval/ApprovalWait";
import ApprovalInProgress from "./pages/approval/ApprovalInProgress";
import ApprovalAccessed from "./pages/approval/ApprovalAccessed";
import ApprovalReturned from "./pages/approval/ApprovalReturned";
import Calendar from "./pages/calendar/Calendar";
import AllSch from "./pages/calendar/AllSch";
import SchSubLayout from "./layouts/SchSubLayout";
import WorkCheck from "./pages/calendar/WorkCheck";
import HolidayCheck from "./pages/calendar/HolidayCheck";
import Login from "./pages/login/Login";
import LoginLayout from "./layouts/LoginLayout";
import LoginBackground from "./components/login/LoginBackground";
import MemberSubLayout from "./layouts/MemberSubLayout";
import Member from "./pages/member/Member";
import EquipmentSubLayout from "./layouts/EquipmentSubLayout";
import Equipment from "./pages/equipment/Equipment";
import ApprovalLineRegist from "./pages/approval/ApprovalLineRegist";
import MemberDetail from "./pages/member/MemberDetail";
import MemberReigst from "./pages/member/MemberRegist";
import FindId from "./pages/login/FindId";
import EquipmentDetail from "./pages/equipment/EquipmentDetail";
import FindPwd from "./pages/login/FindPwd";
import MemberModify from "./pages/member/MemberModify";
import EquipmentRegist from "./pages/equipment/EquipmentRegist";
import UpdatePwd from "./pages/login/UpdatePwd";
import ApprovalDetail from "./pages/approval/ApprovalDetail";
import ApprovalAccessorPage from "./pages/approval/ApprovalAccessorPage";
import ProtectedRoute from "./components/router/ProtectedRoute";
import EducationSubLayout from "./layouts/EducationSubLayout";
import Education from "./pages/education/Education";
import PartNoticeContent from "./pages/myPage/PartNoticeContent";
import NoticeRegist from "./pages/notice/NoticeRegist";
import EducationListSubLayout from "./layouts/EducationListSubLayout";
import EduSafe from "./pages/education/EduSafe";
import EducationDt from "./pages/education/EducationDt";
import EquipmentModify from "./pages/equipment/EquipmentModify";
import NestedList from "./pages/approval/NestedList";
import CompanyCal from "./pages/calendar/CompanyCal";
import MemberMessage from "./pages/myPage/MemberMessage";
import SalaryMain from "./pages/salary/SalaryMain";
import SalaryNavBarSubLayout from "./layouts/SalaryNavBarSubLayout";
import NoticeDetail from "./pages/notice/NoticeDetail";
import SalaryRegist from "./pages/salary/SalaryRegist";
import EduDuty from "./pages/education/EduDuty";
import EduOther from "./pages/education/EduOther";
import EducationPhoto from "./pages/education/EducationPhoto";
import NoticeDeletedList from "./pages/notice/NoticeDeletedList";
import SalaryRegistDetail from "./pages/salary/SalaryRegistDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="/login/findid" element={<FindId/>}/>
          <Route path="/login/findPwd" element={<FindPwd/>}/>
          <Route path="/login/updatePwd" element={<UpdatePwd/>}/>
          
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          
          <Route path="/myPage" element={<SubLayout />}>


            <Route index element={<MyPage />} />
            <Route path="/myPage/Document" element={<Document />} />
            <Route path="/myPage/PartNotice" element={<PartNotice />} />
            <Route path="/myPage/PartNoticeContent/:noticeCode" element={<PartNoticeContent />} />
            <Route path="/myPage/MemberMessage" element={<MemberMessage />} />

          </Route>

          <Route path="/notice" element={<NoticeSubLayout />}>
            <Route index element={<Notice />} />
            <Route path="/notice/search/title/:noticeTitle" element={<Notice/>}/>
            <Route path="/notice/search/content/:noticeContent" element={<Notice/>}/>
            <Route 
              path="/notice/detail/:noticeCode" 
              element={<NoticeDetail/>}/>
            <Route 
              path="/notice/regist" 
              element={
                <ProtectedRoute noticeCheck={true}>
                  <NoticeRegist />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notice/deleted" 
              element={
                <ProtectedRoute noticeCheck={true}>
                  <NoticeDeletedList />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="/approval" element={<ApprovalSubLayout />}>
            <Route index element={<Approval />} />
            <Route path="/approval/regist" element={<ApprovalRegist />} />
            <Route path="/approval/toggletestpage" element={<NestedList />} />  {/* 테스트 용!! */}
            <Route path="/approval/appline" element={<ApprovalLineRegist />} />
            <Route path="/approval/wait" element={<ApprovalWait />} />
            <Route path="/approval/inProgress" element={<ApprovalInProgress />} />            
            <Route path="/approval/accessed" element={<ApprovalAccessed />} />
            <Route path="/approval/returned" element={<ApprovalReturned />} />
            <Route path="/approval/:appCode" element={<ApprovalDetail />} />
            <Route 
              path="/approval/accessor/:appCode" 
              element={
                <ProtectedRoute loginCheck={true}>
                  <ApprovalAccessorPage />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="/calendar" element={<SchSubLayout/>}>
            <Route index element={<Calendar/>}/>
            <Route path="/calendar/allSch" element={<AllSch/>}/>
            <Route path="/calendar/workCheck" element={<WorkCheck/>}/>
            <Route path="/calendar/holidayCheck" element={<HolidayCheck/>}/>
            <Route path="/calendar/companycal" element={<CompanyCal/>}/>
            <Route path="/calendar/allsch" element={<AllSch/>}/>
          </Route>
          <Route path="/equipment" element={<EquipmentSubLayout/>}>
            <Route index element={<Equipment/>} />
            <Route path="detail/:categoryCode" element={<EquipmentDetail/>} />
            <Route path="regist" element={<ProtectedRoute faciltyCheck={true}><EquipmentRegist/></ProtectedRoute>} />
            <Route path="modify" element={<ProtectedRoute faciltyCheck={true}><EquipmentModify/></ProtectedRoute>} />
            <Route path="modify/search" element={<ProtectedRoute faciltyCheck={true}><EquipmentModify/></ProtectedRoute>} />
          </Route>
          <Route path="/member" element={<MemberSubLayout/>}>
            <Route index element={<Member/>}/>
            <Route path="/member/names/:memberName" element={<Member/>}/>
            <Route path="/member/codes/:memberCode" element={<Member/>}/>
            <Route path="/member/department/:deptName" element={<Member/>}/>
            <Route path="/member/job/:jobName" element={<Member/>}/> 
            <Route path="/member/:memberCode" element={<MemberDetail/>}/>
            <Route path="/member/regist" element={<ProtectedRoute hrCheck={true}><MemberReigst/></ProtectedRoute>}/>
            <Route path="/member/modify/:memberCode" element={<ProtectedRoute hrCheck={true}><MemberModify/></ProtectedRoute>}/>
          </Route>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/education" element={<EducationSubLayout/>}>
            <Route index element={<Education/>}/>
            <Route path="/education/:edCode" element={<EducationDt/>}/>
            <Route path="/education/safety" element={<EduSafe/>}/>
            <Route path="/education/duty" element={<EduDuty/>}/>
            <Route path="/education/other" element={<EduOther/>}/>
            <Route path="/education/photoList" element={<EducationPhoto/>}/>
          </Route>
          <Route path="/salary" element={<SalaryNavBarSubLayout/>} >
              <Route index element={<SalaryMain/>}/>
              <Route path="regist" element={<ProtectedRoute payCheck={true}><SalaryRegist/></ProtectedRoute>}/>
              <Route path="detail/:memberCode" element={<ProtectedRoute payCheck={true}><SalaryRegistDetail/></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;