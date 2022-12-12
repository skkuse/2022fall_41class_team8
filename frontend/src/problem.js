import axios from 'axios';
import './problem.css'
import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function OpenTestCase(props){
    const lis =[]
    const same = props.same
    const setSame = props.setSame
    // console.log(props.data)
    // console.log(props.data.ProblemInfo.testcase1)
    // const tc1=props.data.ProblemInfo.testcase1
    // const tc2=props.data.ProblemInfo.testcase2
    const [tc1,setTc1] = useState('1/1')
    const [tc2,setTc2] = useState('1/1')
    
    
    // let tc1='asdf'
    // let tc2='asdf'
    axios.get("http://localhost:8000/server/"+props.problemID+"/")
    .then((response)=>{
        console.log(response)
        setTc1(response.data.ProblemInfo.testcase1)
        setTc2(response.data.ProblemInfo.testcase2)
        })
    

    function valid(input,output,num){
        axios.get("http://localhost:8000/server/"+props.problemID+"/")
        .then((response)=>{
            console.log(response)
            axios.get("http://localhost:8000/server/1/exe_TC",{
                params:{
                    'code':response.data.auto_saved,
                    'input':input,
                    'output':output,
                    'num':num
                }
            })
            .then((response) => {
                console.log(response)
                if(response.data.same===1){
                    let c = [...same]
                    c[response.data.num]=1
                    setSame(c)
                }
                else{
                    let c = [...same]
                    c[response.data.num]=-1
                    setSame(c)
                }

            }).catch((err)=>{
                console.log(err)
            })
        })
        
    }

    lis.push(<li key='1'>
        <div className='tc_each_head'>테스트케이스 1
            <nav className='d-flex'>
                <div className={same[0]===0? "": same[0]===-1 ? "text-danger":"text-success"}>
                    {same[0]===0? "": same[0]===-1 ? "FAIL":"PASS"}</div>
                <p onClick={()=>{
                valid(tc1.split('/')[0],tc1.split('/')[1],0)
                }}>검증</p>
            </nav>
        </div>
        <div className='tc_flex'>
            <div>

                <div>Input</div>
                <div>{tc1.split('/')[0]}</div>
            </div>
            <div>
                <div>Output</div>
                <idv>{tc1.split('/')[1]}</idv>
            </div>
        </div>
        </li>
    )
    lis.push(<li key='2'>
        <div className='tc_each_head'>테스트케이스 2
            <nav className='d-flex'>
                <div className={same[1]===0? "": same[1]===-1 ? "text-danger":"text-success"}>
                    {same[1]===0? "": same[1]===-1 ? "FAIL":"PASS"}</div>
                <p onClick={()=>{
                valid(tc2.split('/')[0],tc2.split('/')[1],1)
                }}>검증</p>
            </nav>
        </div>
        <div className='tc_flex'>
            <div>

                <div>Input</div>
                <div>{tc2.split('/')[0]}</div>
            </div>
            <div>
                <div>Output</div>
                <idv>{tc2.split('/')[1]}</idv>
                
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
    const [restrict,setRestrict] = useState("")
    const [same,setSame] = useState([0,0])


    useEffect(() => {
        async function first() {
            var promise = new Promise((resolve) => {
            axios.get('http://localhost:8000/server/'+props.problemID+'/')
            .then((response) => {
                console.log(response)
                setUserData(response.data);
                setdesc(response.data.ProblemInfo.contents);
                setRestrict(response.data.ProblemInfo.restrict)
            })
            });

            var temp = await promise;
            console.log(temp);
        }
        first();
        const c=[...same]
        c[0]=0
        c[1]=0
        setSame(c)
    },[props.problemID])



    return(
        <div className="section_problem">
            <div className='problem_head'>문제 설명</div>
            <div className='problem_desc overflow-auto h-50 ms-3 me-3'>
                <div>{description}</div>
                <div className='mb-3 mt-3 fs-4 fw-bold'>제약사항</div>
                <div >{restrict}</div>
            </div>
            <OpenTestCase data={userData} problemID={props.problemID} same={same} setSame={setSame}/>
        </div>
    )
}

export default Problem;