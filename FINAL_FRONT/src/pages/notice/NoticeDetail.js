import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import {callModifyNotice, callNoticeDetailAPI} from '../../apis/NoticeAPICalls';
import NoticeCSS from "./Notice.module.css";
import { isAdmin } from "../../utils/TokenUtils";

function NoticeDetail() {

    const {noticeDetail} = useSelector(state => state.noticeReducer);
    const { modify } = useSelector(state => state.noticeReducer);
    const { noticeCode } = useParams();
    const [isModify , setIsModify] = useState(false);
    const [form , setForm] = useState({});
    const [image , setImage] = useState(null);
    const [imageUrl , setImageUrl] = useState('');
    const membersData = useSelector((state) => state.myPageReducer.membersData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ImageInput = useRef();
  
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }


    useEffect(() => {
        console.log('noticeDetail:',noticeDetail);
        dispatch(callNoticeDetailAPI({noticeCode}));
    }, []);

    useEffect(
        () => {
            if(image) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const {result} = e.target;
                    if(result) setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }
        },
        [image]
    );

    useEffect(
        () =>
        {
            if(modify?.status === 200)
                navigate("/notice");
        },
        [modify]
    );

    const onClickModifyHandler = () =>
    {
        if(!isModify)
            setIsModify(true);
        else
            setIsModify(false);
    }

    const onClickModifySaveHandler = () =>
    {
        const formData = new FormData();
        if(!form?.noticeTitle || !form?.noticeContent || !form?.noticeType || !form?.memberCode) 
        {
            if(!form?.noticeTitle) 
            {
                formData.append("noticeTitle" , noticeDetail.noticeTitle);
            }
            else
            {
                formData.append("noticeTitle" , form.noticeTitle);
            }
            if(!form?.noticeContent) 
            {
                formData.append("noticeContent",noticeDetail.noticeContent);
            } 
            else
            {
                formData.append("noticeContent",form.noticeContent);
            }
            if(!form?.noticeType) 
            {
                formData.append("noticeType",noticeDetail.noticeType);
            } 
            else
            {
                formData.append("noticeType",form.noticeType);
            }
        } 
        if(image) 
        {
            formData.append("noticeImage", image);
        }
        formData.append("noticeCode",noticeDetail.noticeCode);
        dispatch(callModifyNotice(formData));
    }

    const onClickDeleteHandler = () => {
    }

        /* 이미지 업로드 버튼 클릭 이벤트 */
        const onClickImgageUpload = () => {
            ImageInput.current.click();
        }
    
        /* 파일 첨부시 동작하는 이벤트 */
        const onChangeImageUpload = (e) => {
            setImage(e.target.files[0]);
        }

    const onChangeHandler = (e) =>
    {
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }

    // const onClickDeleteHandler = (e) =>
    // {

    // }

  return (
    <div className={NoticeCSS}>
        <div className={NoticeCSS.square}></div>
        <div className={NoticeCSS.content}>
            <div className={NoticeCSS.DetailDiv}>
                <table className={NoticeCSS.DetailTable}>
                    <tr>
                        <th className={NoticeCSS.col1}>문서번호</th>
                        <td className={NoticeCSS.col6}>{noticeDetail  && noticeDetail.noticeCode}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col2}>부서</th>
                        { isModify === true ?
                            <td name='noticeType'>
                                <select  
                                    className={NoticeCSS.deptSelect} 
                                    name="noticeType" onChange={onChangeHandler} 
                                    for='noticeType' value={form?.noticeType ? form.noticeType : noticeDetail?.noticeType}>
                                    <option name="noticeType" id=''>공통</option>
                                    <option name="noticeType" id='D1'>인사</option>
                                    <option name="noticeType" id='D2'>안전교육</option>
                                    <option name="noticeType" id='D3'>시설관리</option>
                                </select>
                            </td>
                            :
                            <td className={NoticeCSS.col7}>{form?.noticeType ? form.noticeType : noticeDetail?.noticeType}</td>
                        }
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col3}>등록일</th>
                        <td className={NoticeCSS.col8}>{formatDate(noticeDetail && noticeDetail.noticeRegistDate)}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col4}>제목</th>
                        {
                            isModify === true ?  
                            <input
                            id='noticeTitle'
                            name='noticeTitle'
                            type='text'
                            placeholder='제목을 입력해주세요.'
                            onChange={onChangeHandler}
                            />
                            :
                            <td className={NoticeCSS.col9}>{form?.noticeTitle ? form.noticeTitle : noticeDetail?.noticeTitle}</td>
                        }
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col5}>내용</th>     
                        {isModify === true &&  
                                            <>  
                                            {imageUrl &&
                                                <img 
                                                    src={imageUrl} 
                                                    alt="preview"
                                                    className="AttecthedRgPreview"
                                                    style={{width: "285px", height: "300px"}}
                                                />
                                                }                                   
                                                <input 
                                                    style={{display : 'none'}}
                                                    type="file"
                                                    name="noticeImage"
                                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                                    ref={ImageInput}
                                                    onChange={onChangeImageUpload}
                                                />
                                                <button 
                                                    className='imgRgBtn'
                                                    onClick={onClickImgageUpload}
                                                    style={{}}
                                                > 
                                                파일 업로드
                                                </button>
                                            
                                            </>
                        }
                        { isModify === true ? <textarea
                                        placeholder='내용을 입력해주세요.'
                                        id='noticeContent'
                                        name='noticeContent'
                                        onChange={onChangeHandler}
                                        style={{width : "485px" , height : " 300px" }} 
                                        /> : 
                                    <td className={NoticeCSS.col10}>
                                            <img className={NoticeCSS.contentImg} 
                                                src={ imageUrl ? imageUrl : noticeDetail?.noticefiles[0]?.filePath ? noticeDetail.noticefiles[0].filePath : null} 
                                                alt="게시판 이미지입니다"/>
                                        <p>{form?.noticeContent ? form.noticeContent : noticeDetail?.noticeContent}</p>
                                    </td> 
                        }
                    </tr>
                </table>
                {isAdmin && <div className={NoticeCSS.detailAdminDiv}>
                    {!isModify && 
                       membersData?.memberRole?.roleName === 'ROLE_BOARD' &&<div className={NoticeCSS.modifyBtn} onClick={onClickModifyHandler}> <img src='../../image/MODIFY-BTN.png'></img></div>}
                    {isModify && <div className={NoticeCSS.saveBtn} onClick={onClickModifySaveHandler}>저장</div>}
                    {/* <div className={NoticeCSS.deleteBtn} onClick={onClickDeleteHandler}><img src='../../image/delete-btn.png'></img></div> */}
                    {/*여기가 오류가 떠요*/}
                </div>}
            </div>
        </div>
    </div>
    );
  
  
  
};


export default NoticeDetail;