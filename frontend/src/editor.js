import './editor.css'
import Editor from '@monaco-editor/react';
import {Download,FolderFill,Files,ArrowClockwise} from 'react-bootstrap-icons'
import React,{useEffect, useRef,useState,useCallback} from 'react';
import axios from 'axios';


const SqlQueryEditor = (props) => {
	return <Editor height='77vh' language='python' onMount={props.mount} value={props.value}/>
}



function CodeEditor(){
    const [codeText,setCodeText] = useState()
    const [userData, setUserData] = useState()
    useEffect(()=>{
      axios
        .get('http://localhost:8000/server/1/')
        .then((response) => {
          setUserData(response.data);
          setCodeText(response.data.ProblemInfo.skeleton);
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

      function processFile(file) {
        var reader = new FileReader();
        reader.onload = function () {
            setCodeText(reader.result)
        };
        reader.readAsText(file, /* optional */ "euc-kr");
    }

    const Upload = (props) => {
        const fileInput = React.useRef(null);
        
        const handleButtonClick = () => {
          fileInput.current.click();
        };
        
        const handleChange = e => {
        //   console.log(e.target.files[0]);
          processFile(e.target.files[0])
        };
        
        return (
          <React.Fragment>
            {/* <button onClick={handleButtonClick}>파일 업로드</button> */}
            <div onClick={handleButtonClick}>{props.icon}</div>
            <input type="file"
                   ref={fileInput}
                   onChange={handleChange}
                   style={{ display: "none" }} />
          </React.Fragment>
        );
      }

      const download = useCallback((filename, code) => {
        let fileName = 'down.txt';
        let output = code;
        const element = document.createElement('a');
        const file = new Blob([output], {
          type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
      },[])

    return(
        <div className="section_editor">
            <div className='editor_head'>코드 입력</div>
            <div className='editor_code'>
                {text}
            </div>
            <div className='open'><Upload icon={<FolderFill/>}/></div>
            <div className='clear' onClick={() => {
                setCodeText(userData.ProblemInfo.skeleton)
                }}><ArrowClockwise/>
            </div>
            <div className='copy' onClick={() => copy(codeText)}><Files/></div>
            <div className='download' onClick={()=>{
                download('down_1.txt',codeText)
            }}><Download/></div>
            <div className='execute' onClick={showValue}>실행</div>
            <div className='scoring' onClick={getUser}>채점</div>
            <div className='submit' onClick={getScore}>제출</div>
        </div>
    )
}




export default CodeEditor;