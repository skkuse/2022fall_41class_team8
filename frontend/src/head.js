import './head.css'
import 'bootstrap/dist/css/bootstrap.css';
import {CaretRightFill,CaretLeftFill,CaretLeft,CaretRight, QuestionSquare} from 'react-bootstrap-icons'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
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


function Head(){
    const [question, setQuestion] = React.useState();
    const [questList, setQuestList]= React.useState({arr:[]});

    React.useEffect(()=>{
        axios
          .get('http://localhost:8000/server/')
          .then((response) => {
            setQuestList({arr:response.data});
          })
        }, []);

    const handleChange = (event) => {
    setQuestion(event.target.value);
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
                <FormControl sx={{ m: 1, minWidth: 200}} size = "small">
                    <InputLabel id="question_select">Question</InputLabel>
                    <Select
                    labelId="question_select"
                    id="question_select"
                    value={question || ''}
                    onChange={handleChange}
                    autoWidth
                    label="question"
                    >
                    {questList.arr.map((quest) =>  {
                        return <MenuItem value={quest.title} key={quest.id}> {quest.chapter}-{quest.title}</MenuItem>
                    })}
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