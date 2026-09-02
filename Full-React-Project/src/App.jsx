import {useState , useEffect} from 'react'
import {useDispatch} from 'react-redux'

import authoService from './appwrite/Autho'
import{login , logout} from './store/AuthSlice'

import {Header , Footer} from './components/index'




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
<div className="min-h-screen bg-gray-800">
  <div className="w-full max-w-5xl mx-auto block bg-gray-700 min-h-screen">

    <Header />

    <main >
      TODO
      {/* <Outlet /> */}
    </main>

    <Footer />

  </div>
</div>
  ) : null ;
}
