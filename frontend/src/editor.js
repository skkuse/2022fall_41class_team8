import './editor.css'
import Editor from '@monaco-editor/react';
import {Download,FolderFill,Files,ArrowClockwise} from 'react-bootstrap-icons'
import React,{useEffect, useRef,useState} from 'react';
import axios from 'axios';


const SqlQueryEditor = (props) => {
	return <Editor height='77vh' language='python' onMount={props.mount} value={props.value}/>
}

function CodeEditor(){
    const [codeText,setCodeText] = useState('//type your code')
    const [userData, setUserData] = useState()
    useEffect(()=>{
      axios
        .get('http://localhost:8000/server/1/')
        .then((response) => {
          setUserData(response.data);
        })   
      }, []);

    async function getUser() {
        try {
            //const response = await axios.get('http://localhost:8000/server/1/');          
            setCodeText(userData.auto_saved)
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
        alert(userData.auto_saved);
    } 

    async function Save(slot){
      if (slot === 1)
        setUserData({...userData, save1: editorRef.current.getValue()})
      else if (slot === 2)
        setUserData({...userData, save1: editorRef.current.getValue()})
      else if (slot === 3)
        setUserData({...userData, save1: editorRef.current.getValue()})
      else
        setUserData({...userData, auto_saved: editorRef.current.getValue()})
      try {
      await axios.put('http://localhost:8000/server/1/', userData);
      } catch(e){
        console.error(e);
      }
    }

    async function getScore() {
      Save(0)
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

    return(
        <div className="section_editor">
            <div className='editor_head'>코드 입력</div>
            <div className='editor_code'>
                {text}
            </div>
            <div className='open'><FolderFill/></div>
            <div className='clear' onClick={() => {
                setCodeText(userData.ProblemInfo.skeleton)
                }}><ArrowClockwise/>
            </div>
            <div className='copy' onClick={() => copy(codeText)}><Files/></div>
            <div className='download'><Download/></div>
            <div className='execute' onClick={showValue}>실행</div>
            <div className='scoring' onClick={getUser}>채점</div>
            <div className='submit' onClick={getScore}>제출</div>
        </div>
    )
}




export default CodeEditor;