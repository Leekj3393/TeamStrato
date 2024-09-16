import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callClassInfoAPI, callClassViewAPI, callEducationDetailAPI, callEducationUpdateAPI } from "../../apis/EducationAPICalls";
import EduDtCSS from "./EducationDt.module.css";
import ReactPlayer from "react-player";

function EducationDt () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { edu } = useSelector(state => state.educationReducer);
    const params = useParams();
    const edCode = params.edCode;
    const serverUrl = "http://localhost:8001/videos/"
    const { classInfo } = useSelector((state) => state.classReducer);


    const [playTime, setPlayTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef(null);

    const classTime = Math.floor( playTime * 1000 );

    useEffect(
        () => {
            dispatch(callEducationDetailAPI({edCode}));
            dispatch(callClassInfoAPI({edCode}));
        },
        []
    )
    
    /* 수강 업데이트 핸들러 */
    const onClickEducationUpdateHandler = (edCode, classTime) => {
        dispatch(callEducationUpdateAPI({edCode, classTime}));   
        navigate(`/education`, {replace : true});
        window.location.reload();
    };

    const handleProgress = (progress) => {
        setPlayTime(progress.playedSeconds);
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleMuteUnMute = () => {
        setIsMuted(!isMuted);
    }

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        return formattedTime;
    }

    const padZero = (number) => {
        return number.toString().padStart(2, '0');
      };

    return (
        <div className={EduDtCSS.eduDtBack}>
            <div className={EduDtCSS.eduDtTitle}>
                <span>{edu && edu.education?.edName}</span>
            </div>
            <div className={EduDtCSS.eduDtVideo}>
            <ReactPlayer
                ref={videoRef}
                url={serverUrl + (edu && edu.video?.filePath)}
                controls = {false}
                width={600}
                height={400}
                onProgress={handleProgress}
                playing={isPlaying}
                volume={isMuted ? 0 : 0.5}
                onDuration={(duration) => {
                    setDuration(duration);
                }}
                progressInterval={1000}
                onStart={() => {
                    if(classInfo && classInfo.classTime) {
                        videoRef.current.seekTo(classInfo.classTime / 1000);
                    }
                }}
            />
            </div>
            <div className={EduDtCSS.eduControls}>
                <div className={EduDtCSS.eduPlayTime}>
                <button
                    onClick={handlePlayPause}
                    type="button"
                >
                    <img src={!isPlaying ? '/image/재생버튼2.png' : '/image/멈춤버튼2.png'}/>  
                </button>
                <span>{formatTime(playTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={playTime}
                    onChange={(e) => setPlayTime(parseFloat(e.target.value))}
                />
                <span>{formatTime(duration)}</span>
                <button
                    onClick={handleMuteUnMute}
                    type="button"
                >
                    <img src={isMuted ? '/image/음소거버튼2.png' : '/image/소리버튼2.png'}/>
                </button>
                </div>
            </div>
            <div className={EduDtCSS.eduDtpro}>
            <p> * 교육 영상을 모두 시청하여야 교육완료 상태로 변환됩니다. </p>
            </div>
            <div className={EduDtCSS.eduDtBt}>
                <button onClick={ () => onClickEducationUpdateHandler(edCode, classTime)}>수강 완료</button>
            </div>
        </div>
    );
}

export default EducationDt;