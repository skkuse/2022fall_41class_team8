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
            <div className='head_title'></div>
            <div className='head_title_txt'>
                <FormControl sx={{ m: 1, minWidth: 200 }} size = "small">
                    <InputLabel id="question_select">Question</InputLabel>
                    <Select
                    labelId="question_select"
                    id="question_select"
                    value={question}
                    onChange={handleChange}
                    autoWidth
                    label="question"
                    >
                
                    <MenuItem value={10}>Week 1: For Loops</MenuItem>
                    <MenuItem value={21}>Week 2: Recursion</MenuItem>
                    <MenuItem value={22}>Week 3: Functions</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='arrow_left'><CaretLeft/></div>
            <div className='arrow_left arrow_show_left'><CaretLeftFill/></div>
            <div className='arrow_right'><CaretRight/></div>
            <div className='arrow_right arrow_show_right'><CaretRightFill/></div>
        </div>
    )
}

export default Head;