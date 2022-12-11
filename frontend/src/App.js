import './App.css';
import Head from './head'
import Problem from './problem'
import CodeEditor from './editor'
import { useState } from 'react';

function App() {

  const [PID,setPID] = useState('1');
  const [user,setUser] = useState(0);
  const selectProblem = (ID) => {
    setPID(ID)
    console.log('print ID',ID)
  }
      
  
  return (
    <div className="App">
      <Head selectFunction={selectProblem}/>
      <Problem problemID={PID}/>
      <CodeEditor problemID={PID}/>
    </div>
  );
}

export default App;
