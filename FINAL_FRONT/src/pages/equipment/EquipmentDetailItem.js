import EquItemCSS from "./EquItemCSS.css";

function EquipmentDetailItem({equ : { file , equipmentCode , equipmentName , equipmentStatus , equCategory}})
{   
    console.log(file);
    return(
        <div className="Item-back">
            <div className="imgbox">
              <img src={ file.filePath } alt="이미지입니다 감사합니다"></img>
            </div>
            <div className="item-text-box">
            <div className="text-box1">
                <span>장비 코드 : </span>
                <span>{ equipmentCode }</span>
            </div>
            <div className="text-box2">
                <span>장비 명 : </span>
                <span>{ equipmentName }</span>
            </div>
            <div className="text-box3">
                <span>장비 상태 : </span>
                <span>{ equipmentStatus }</span>
            </div>
            <div className="text-box4">
                <span>장비 장비 분류 : </span>
                <span>{ equCategory.equCategory.categoryName +' '+ equCategory.categoryName }</span>
            </div>
            </div>
            
        </div>
    );
}

export default EquipmentDetailItem;