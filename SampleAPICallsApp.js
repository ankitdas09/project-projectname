import { useState, useEffect } from 'react'
import axios from 'axios'
const serverURL = 'http://localhost:8000'
// send cookies
axios.defaults.withCredentials = true

function App() {

  const handleLogin = () => {
    window.open(`${serverURL}/auth/google`, '_self')
  }
  const handleLogout = () => {
    window.open(`${serverURL}/auth/logout`, '_self')
  }

  // check if logged in
  // sends back user if logged in else sends error
  const getAuth = async () => {
    try {
      const resp = await axios.get('/auth/login/success')
      console.log(resp.data.user)
      setUser(resp.data.user._json)
    } catch (error) {
      console.log(error.response.data)
      setUser(null)
    }
  }

  // post form
  const postForm = async () => {
    try {
      const resp = await axios.post('/forms/', {
        "email": user.email,
        "name": "test",
        "weight": "70",
        "age": "20",
        "height": "190",
        "bloodSugar": "89"
      })
      console.log(resp.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const [user, setUser] = useState(null)
  useEffect(() => async () => getAuth()
    , [])

  return (
    <div className="App">
      {!user ?
        <button onClick={handleLogin}>Login</button> :
        <>
          <button onClick={postForm}>Post Form</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      }
    </div>
  );
}

export default App;
