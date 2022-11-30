import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill} from 'react-bootstrap-icons'
function Head(){
    return(
        <div className="section_head">
            <div className='head_title'></div>
            <div className='head_title_txt'>week1: 문제 제목</div>
            <div className='arrow_left'><CaretLeftFill/></div>
            <div className='arrow_right'><CaretRightFill/></div>
        </div>
    )
}

export default Head;