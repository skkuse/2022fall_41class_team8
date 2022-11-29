import axios from 'axios';

export default function AApi(){
    let data='asdf'
  axios.get("/server/1")
  .then(function(response){
    console.log(JSON.stringify(response))
    data+=JSON.stringify(response)
  })
  .catch(function(error){
    console.log(error)
  })
  return (
    <div>
        {data}
    </div>
  )
}