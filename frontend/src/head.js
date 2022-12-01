import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill,CaretLeft,CaretRight} from 'react-bootstrap-icons'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Head(){
    const [question, setQuestion] = React.useState('');

    const handleChange = (event) => {
    setQuestion(event.target.value);
    };

    return(
        <div className="section_head">
            <div className='head_title'><CaretLeftFill/>week1: 문제 제목<CaretRightFill/></div>
        </div>
    )
}

export default Head;