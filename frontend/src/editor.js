import './editor.css'
import Editor from '@monaco-editor/react';
import {Download,FolderFill,Files,ArrowClockwise} from 'react-bootstrap-icons'

const SqlQueryEditor = () => {
	return <Editor height='77vh'/>
}

function CodeEditor(){
    return(
        <div className="section_editor">
            <div className='editor_head'>코드 입력</div>
            <div className='editor_code'>
                <SqlQueryEditor />
            </div>
            <div className='open'><FolderFill/></div>
            <div className='clear'><ArrowClockwise/></div>
            <div className='copy'><Files/></div>
            <div className='download'><Download/></div>
            <div className='execute'>실행</div>
            <div className='scoring'>채점</div>
            <div className='submit'>제출</div>
        </div>
    )
}

export default CodeEditor;