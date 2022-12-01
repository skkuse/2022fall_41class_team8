import axios from 'axios';
import './problem.css'
import React,{useEffect,useState} from 'react';


function Problem(){
    const [userData, setUserData] = useState()
    const [description,setdesc] = useState()
    useEffect(()=>{
      axios
        .get('http://localhost:8000/server/1/')
        .then((response) => {
          setUserData(response.data);
          setdesc(response.data.ProblemInfo.contents)
        //   console.log()
        })   
      }, []);

    return(
        <div className="section_problem">
            <div className='problem_head'>문제 설명</div>
            <div className='problem_desc'>{description}</div>
        </div>
    )
}

export default Problem;