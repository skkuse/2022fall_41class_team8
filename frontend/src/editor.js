import './editor.css'
import Editor from '@monaco-editor/react';
import React,{useEffect, useRef,useState} from 'react';
import {Download,FolderFill,Files,ArrowClockwise,Dice1,Dice2,Dice3} from 'react-bootstrap-icons'
import axios from 'axios';


const SqlQueryEditor = (props) => {
	return <Editor height='77vh' language='python' onMount={props.mount} value={props.value}/>
}

function CodeEditor(){
    const [codeText, setCodeText] = useState()
    const userData = useRef()
    const AUTO_SAVE_INTERVAL = 30000
    useEffect(()=>{
      axios
        .get('http://localhost:8000/server/1/')
        .then((response) => {
          userData.current = response.data;
          if(response.data.status === "Not solved")
            setCodeText(response.data.ProblemInfo.skeleton);
          else
            setCodeText(response.data.auto_saved);
        })
      const interval = setInterval(()=> {
        Save(0);
      }, AUTO_SAVE_INTERVAL);
      
      return () => clearInterval(interval);
      }, []);

    
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
      if (slot === 1)
        userData.current = {...userData.current, save1: editorRef.current.getValue()}
      else if (slot === 2)
        userData.current = {...userData.current, save2: editorRef.current.getValue()}
      else if (slot === 3)
        userData.current = {...userData.current, save3: editorRef.current.getValue()}
      else
        userData.current = {...userData.current, auto_saved: editorRef.current.getValue()}
      try {
        await axios.put('http://localhost:8000/server/1/', userData.current);
        } catch(e){
          console.error(e);
      }
    }

    async function getScore() {
      Save(0);
      try {
          const response = await axios.get('http://localhost:8000/server/1/scoring');          
          alert(response.data.explanation)
      } catch (e) {
        console.error(e);
      }
    }

    const text = <SqlQueryEditor mount={handleEditorDidMount} value={codeText}/>

    const copy = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          alert('복사 성공!');
        } catch (error) {
          alert('복사 실패!');
        }
      };
    
      const resetCode = () => {
        setCodeText((prev) => "")
        alert(editorRef.current.getValue())
        alert(codeText)
        setCodeText(() => userData.current.ProblemInfo.skeleton)
        alert(codeText)
      }
    
    
      const saveInSlot = async (slot) => {
        var saved_string = "";
        if (slot === 1){
          saved_string = userData.current.save1;
        } else if (slot === 2){
          saved_string = userData.current.save2;
        } else if (slot === 3){
          saved_string = userData.current.save3;
        }
        if (saved_string !== String(slot)){
          if (window.confirm(`${slot} 번에 저장한 코드가 있습니다.\n 덮어쓰시겠습니까?`))
            Save(slot)
        }
        else
          Save(slot)
        alert("저장 성공!")
      }


    return(
        <div className="section_editor">
            <div className='editor_head'>코드 입력</div>
            <div className='editor_code'>
                {text}
            </div>

            <div className = "save_row">
              <div className = "save_header">Saves</div>
              <div className = "save_slot" onClick={() =>saveInSlot(1)}><Dice1/></div>
              <div className = "save_slot" onClick={() =>saveInSlot(2)}><Dice2/></div>
              <div className = "save_slot" onClick={() =>saveInSlot(3)}><Dice3/></div>
            </div>

            <div className='open'><FolderFill/></div>
            <div className='clear' onClick={resetCode}><ArrowClockwise/></div>
            <div className='copy' onClick={() => copy(codeText)}><Files/></div>
            <div className='download'><Download/></div>
            <button className='execute' onClick={showValue}>실행</button>
            <button className='scoring' onClick={getUser}>채점</button>
            <button className='submit' onClick={getScore}>제출</button>
        </div>
  
    )
}




export default CodeEditor;