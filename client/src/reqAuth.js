import axios from 'axios';



export default function requireAuth() {
  axios({
    method:"GET",
    withCredentials: true,
    url:"http://localhost:4000/user"
  })
  .then(response => {
      console.log(response.data.isAuthenticated)
      if(response.data.isAuthenticated){
          console.log('true')
          return true
      }else {
          return false
      }
  })
}