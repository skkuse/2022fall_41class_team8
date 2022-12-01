import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill} from 'react-bootstrap-icons'
function Head(){
    return(
        <div className="section_head">
            <div className='head_title'><CaretLeftFill/>week1: 문제 제목<CaretRightFill/></div>
        </div>
    )
}

export default Head;