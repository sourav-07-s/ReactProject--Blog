import {useState , useEffect} from 'react'
import {useDispatch} from 'react-redux'

import authoService from './appwrite/Autho'
import{login , logout} from './store/AuthSlice'

import {Header , Footer} from './components'




export const App = () => {

  const [loading, setloading] = useState(true) ;


  const dispatch = useDispatch() ;


  useEffect (()=>{

    authoService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(()=>{
      setloading(false) ;
    })

  },[])
  
   
return !loading ? (
    <div className=" min-h-screen flex flex-wrap content-between bg-gray-800 ">
      <div className = "w-full block">
        <Header />
        <main>
         TODo {/* <outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null ;
}
