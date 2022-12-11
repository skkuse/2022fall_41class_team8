import './editor.css'
import Editor from '@monaco-editor/react';
import React,{useEffect, useRef,useState,useCallback} from 'react';
import {Download,FolderFill,Files,ArrowClockwise,Dice1,Dice2,Dice3,SdCard} from 'react-bootstrap-icons'
import axios from 'axios';



const SqlQueryEditor = (props) => {
	return <Editor height="100%" language='python' onMount={props.mount} value={props.value}/>
}

function Result(props){
    const heads = ["기능 점수","효율 점수","가독성 점수","코드 설명","관련 자료"]
    const head_DOMs = []
    const [click,setclick] = useState([1,0,0,0,0])
    const [content,setContent] = useState(heads[0])
    for(let i=0;i<5;i++){
        head_DOMs.push(
            <div className={click[i]?"menu_click":"menu"} id={i} onClick={event=>{
                const c = [0,0,0,0,0]
                c[event.target.id]=1
                setclick(c)
                setContent(heads[i])
            }}>
                {heads[i]}
            </div>
        )
    }
    return(
        <div className='result_section'>
            {/* <div className='result_head'>실행결과</div> */}
            <div className='result_menu'>
                {head_DOMs}
            </div>
            <div className='contents'>
                {content}
            </div>
        </div>
    )
}

function CodeEditor(props){
    console.log('in editor first',props.problemID)
    const [codeText,setCodeText] = useState()
    const [whichSave, setWhichSave] = useState(1)
    const userData = useRef()
    const AUTO_SAVE_INTERVAL = 1000

    useEffect(()=>{
      const interval = setInterval(()=> {
        Save(0);
      }, AUTO_SAVE_INTERVAL);
      
      return () => clearInterval(interval);
      }, [props.problemID]);

    useEffect(()=>{
      axios
        .get('http://localhost:8000/server/'+props.problemID+'/')
        .then((response) => {
          userData.current = response.data;
          if(response.data.status === "Not solved")
            setCodeText(response.data.ProblemInfo.skeleton);
          else
            setCodeText(response.data.auto_saved);
        })
      loadSave(1,1)
      }, [props.problemID]);

    
    async function getUser() {
        try {
            setCodeText(userData.current.auto_saved)
        } catch (e) {
          console.error(e);
        }
    }

    const editorRef = useRef(null);
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
      }
    
    function showValue() {
        alert(editorRef.current.getValue());
        alert(userData.current.auto_saved);
    } 

    async function Save(slot){
      if(slot===0){
          userData.current = {...userData.current, auto_saved: editorRef.current.getValue()}
          setCodeText(editorRef.current.getValue())
      }
      else{
        if (!window.confirm(`${slot} 번에 저장하시겠습니까?`)){
          return;
        }
        if (slot === 1)
        userData.current = {...userData.current, save1: editorRef.current.getValue()}
        else if (slot === 2)
        userData.current = {...userData.current, save2: editorRef.current.getValue()}
        else if (slot === 3)
        userData.current = {...userData.current, save3: editorRef.current.getValue()}
      }
      try {
        await axios.put('http://localhost:8000/server/'+props.problemID+'/', userData.current);
      } catch(e){
        console.error(e);
      }
    }

    async function getScore() {
      Save(0);
      try {
          const response = await axios.get('http://localhost:8000/server/'+props.problemID+'/scoring');          
          alert(response.data.explanation)
      } catch (e) {
        console.error(e);
      }
    }

    const autoSave = (event) => {
        console.log(event.target.value)
    }

    const text = <SqlQueryEditor mount={handleEditorDidMount} value={codeText} onDidChangeContent={autoSave} />

    const copy = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          alert('복사 성공!');
        } catch (error) {
          alert('복사 실패!');
        }
      };
    
      // const resetCode = () => {
      //   setCodeText((prev) => "")
      //   alert(editorRef.current.getValue())
      //   alert(codeText)
      //   setCodeText(() => userData.current.ProblemInfo.skeleton)
      //   alert(codeText)
      // }
    
    
      // const saveInSlot = async (slot) => {
      //   var saved_string = "";
      //   if (slot === 1){
      //     saved_string = userData.current.save1;
      //   } else if (slot === 2){
      //     saved_string = userData.current.save2;
      //   } else if (slot === 3){
      //     saved_string = userData.current.save3;
      //   }
      //   if (saved_string !== String(slot)){
      //     if (window.confirm(`${slot} 번에 저장하시겠습니까?`))
      //       Save(slot)
      //   }
      //   else
      //     Save(slot)
      //   alert("저장 성공!")
      // }


    function processFile(file) {
        var reader = new FileReader();
        reader.onload = function () {
            setCodeText(reader.result)
        };
        reader.readAsText(file, /* optional */ 'utf-8');
    }

    const Upload = (props) => {
        const fileInput = React.useRef(null);
        
        const handleButtonClick = () => {
          fileInput.current.click();
        };
        
        const handleChange = e => {
          processFile(e.target.files[0])
        };
        
        return (
          <React.Fragment>
            <div onClick={handleButtonClick}>{props.icon}</div>
            <input type="file"
                   ref={fileInput}
                   onChange={handleChange}
                   style={{ display: "none" }} />
          </React.Fragment>
        );
      }

      const download = useCallback((filename, code) => {
        let fileName = props.problemID+'.py';
        let output = code;
        const element = document.createElement('a');
        const file = new Blob([output], {
          type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
      },[props.problemID])

      const loadSave = (slot,skip) => {

        if (skip===0 && !window.confirm(`${slot}번을 불러오시겠습니까?`)){
          return;
        }
        setWhichSave(slot)
        for(let i=1;i<=3;i++){
          document.querySelector('#s'+i.toString()).className='save_slot'
        }
        document.querySelector('#s'+slot.toString()).className='save_slot_click'
        if(slot===1){
          setCodeText(userData.current.save1)
        }
        if(slot===2){
          setCodeText(userData.current.save2)
        }
        if(slot===3){
          setCodeText(userData.current.save3)
        }
      }
    return(
        <div className="section_editor">
            <div className='editor_head'>
                코드 입력                
            </div>
            <div className = "save_row">
                <div className ="save_header" onClick={() => Save(whichSave)}><SdCard/></div>
                <div className ="save_slot" id='s1' onClick={() => loadSave(1,0)}><Dice1/></div>
                <div className ="save_slot" id='s2' onClick={() => loadSave(2,0)}><Dice2/></div>
                <div className ="save_slot" id='s3' onClick={() => loadSave(3,0)}><Dice3/></div>
            </div>
            <div className='editor_code'>
                {text}
            </div>
            <div className='open'><Upload icon={<FolderFill/>}/></div>
            <div className='clear' onClick={() => {
                setCodeText(userData.current.ProblemInfo.skeleton)
                }}><ArrowClockwise/>
            </div>
            <div className='copy' onClick={() => copy(codeText)}><Files/></div>
                <div className='download' onClick={()=>{
                    download('down_1.txt',codeText)
                }}><Download/></div>
            <div className='execute' onClick={showValue}>실행</div>
            <div className='scoring' onClick={getUser}>채점</div>
            <div className='submit' onClick={getScore}>제출</div>
            <Result contents={"hello"}/>
        </div>
  
    )
}




export default CodeEditor;