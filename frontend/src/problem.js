import axios from 'axios';
import './problem.css'
import React,{useEffect,useState} from 'react';
import { PcDisplay } from 'react-bootstrap-icons';


function valid(){
    axios.get("http://localhost:8000/server/1/exe_TC",{
        params:{
            'input':1,
        }
    })
    .then((response) => {
        console.log(response)
    }).catch((err)=>{
        console.log(err)
    }).then(()=>{
        console.log('in last')
    })
}

function OpenTestCase(props){
    const lis = []
    console.log(props.data)
    // console.log(props.data.ProblemInfo.testcase1)
    lis.push(<li key='1'>
        <div className='tc_each_head'>테스트케이스 1<nav><p onClick={valid}>검증</p></nav></div>
        <div className='tc_flex'>
            <div>

                <div>Input</div>
                <div>1</div>
                {/* <div>{props.data.ProblemInfo.testcase1}</div> */}
            </div>
            <div>
                <div>Output</div>
                <idv>1</idv>
            </div>
        </div>
        </li>
    )
    lis.push(<li key='2'>
        <div className='tc_each_head'>테스트케이스 2<nav><p onClick={valid}>검증</p></nav></div>
        <div className='tc_flex'>
            <div>

                <div>Input</div>
                <div>3</div>
                {/* <div>{props.data.ProblemInfo.testcase2}</div> */}
            </div>
            <div>
                <div>Output</div>
                <idv>2</idv>
            </div>
        </div>
        </li>
    )
    return(
        <div className='open_test_case'>
            <div className='TC_head'>테스트케이스</div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}

function Problem(props){
    console.log('in p.js first',props.problemID)
    const [userData, setUserData] = useState()
    const [description,setdesc] = useState("문제 설명입니다.")


    useEffect(() => {
        async function first() {
          var promise = new Promise((resolve) => {
            axios.get('http://localhost:8000/server/'+props.problemID+'/')
            .then((response) => {
                setUserData(response.data);
                setdesc(response.data.ProblemInfo.contents);
            })
          });
    
          var temp = await promise;
          console.log(temp);
        }
        first();
      },[props.problemID])

    // async function getAxios(){
    //     const response = await axios.get('http://localhost:8000/server/'+props.problemID+'/')
    //     console.log(response)
    //     setUserData(response.data);
    //     setdesc(response.data.ProblemInfo.contents)
    // }

    // useEffect(getAxios, []);
    return(
        <div className="section_problem">
            <div className='problem_head'>문제 설명</div>
            <div className='problem_desc'>{description}</div>
            <OpenTestCase data={userData}/>
        </div>
    )
}

export default Problem;