import axios from 'axios';

function Ax(){
  let data = '';
  axios.get('http://localhost:8000/server')
  .then(function (x){
    console.log(x)
    data+=x;
  }).catch((err)=>{
    console.log(err)
  })
  return(
    <div>
      123
      {data}
    </div>
  )
}

export default Ax;