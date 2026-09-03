import {useDispatch} from "react-redux";
import AuthService from "../../services/AuthService.js";
import {logout} from "../../store/AuthSlice.js"

function LgoutBtn() {
 

  const dispatch = useDispatch() ;

  const logoutHandler = ()=>{
    AuthService.logout().then(()=>{
      dispatch(logout())
    })
  }

  return (
    <button
     className = " inline-block rounded-lg px-6 py-2  duration-300 hover:bg-blue-200 "
    
    >Logout</button>
  )
}

export default LgoutBtn