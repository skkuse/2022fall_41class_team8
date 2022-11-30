import './editor.css'
import Editor from '@monaco-editor/react';
import {Download,FolderFill,Files,ArrowClockwise} from 'react-bootstrap-icons'
import React,{useRef,useState} from 'react';
import axios from 'axios';


const SqlQueryEditor = (props) => {
	return <Editor height='77vh' language='python' onMount={props.mount} value={props.value}/>
}

function CodeEditor(){
    const [codeText,setCodeText] = useState('//type your code')
    async function getUser() {
        try {
            const response = await axios.get('http://localhost:8000/server/1/');          
            setCodeText(response.data.auto_saved)
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
                setCodeText('')
                }}><ArrowClockwise/>
            </div>
            <div className='copy' onClick={() => copy(codeText)}><Files/></div>
            <div className='download'><Download/></div>
            <div className='execute' onClick={showValue}>실행</div>
            <div className='scoring' onClick={getUser}>채점</div>
            <div className='submit'>제출</div>
        </div>
    )
}




export default CodeEditor;