import './editor.css'
import Editor from '@monaco-editor/react';
import {Download,FolderFill,Files,ArrowClockwise} from 'react-bootstrap-icons'
import React,{useRef} from 'react';



// const RunExecute = () => {
//     // alert(document.getElementById('monaco'))
//     console.log(1)
// }

const SqlQueryEditor = (props) => {


	return <Editor height='77vh' language='python' onMount={props.mount}/>
}

function CodeEditor(){

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
      }
      
    function showValue() {
        alert(editorRef.current.getValue());
    }

    const text = <SqlQueryEditor mount={handleEditorDidMount}/>
    
    return(
        <div className="section_editor">
            <div className='editor_head'>코드 입력</div>
            <div className='editor_code'>
                {text}
            </div>
            <div className='open'><FolderFill/></div>
            <div className='clear'><ArrowClockwise/></div>
            <div className='copy'><Files/></div>
            <div className='download'><Download/></div>
            <div className='execute' onClick={showValue}>실행</div>
            <div className='scoring'>채점</div>
            <div className='submit'>제출</div>
        </div>
    )
}




export default CodeEditor;