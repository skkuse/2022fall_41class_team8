import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill,CaretLeft,CaretRight} from 'react-bootstrap-icons'
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
//   status: {
//     danger: 'white',
//     // danger: "blue",
//   },
  palette: {
    light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
  },
});


function Head(props){
    const [question, setQuestion] = React.useState('1');

    const handleChange = (event) => {
        console.log(event.target)
        setQuestion(event.target.value);
        props.selectFunction(event.target.value)
    };

    // return(
    //     <div className="section_head">
    //         <div className='head_title'><CaretLeftFill/>week1: 문제 제목<CaretRightFill/></div>
    //     </div>
    // )
    return(
        <div className="section_head">
            <div className='head_title'></div>
            <div className='head_title_txt'>
                <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, minWidth: 200}} size = "small" >
                    {/* <InputLabel id="question_select">Question</InputLabel> */}
                    <Select
                    value={question}
                    onChange={handleChange}
                    autoWidth
                    displayEmpty
                    >
                    <MenuItem value="1">Week 1: 피보나치수열</MenuItem>
                    <MenuItem value="2">Week 2: 최댓값</MenuItem>
                    </Select>
                </FormControl>
                </ThemeProvider>
            </div>
            <div className='arrow_left'><CaretLeft/></div>
            <div className='arrow_left arrow_show_left'><CaretLeftFill/></div>
            <div className='arrow_right'><CaretRight/></div>
            <div className='arrow_right arrow_show_right'><CaretRightFill/></div>
        </div>
    )
}

export default Head;