import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill,CaretLeft,CaretRight} from 'react-bootstrap-icons'
function Head(){
    return(
        <div className="section_head">
            <div className='head_title'></div>
            <div className='head_title_txt'>week1: 문제 제목</div>
            <div className='arrow_left'><CaretLeft/></div>
            <div className='arrow_left arrow_show_left'><CaretLeftFill/></div>
            <div className='arrow_right'><CaretRight/></div>
            <div className='arrow_right arrow_show_right'><CaretRightFill/></div>
        </div>
    )
}

export default Head;