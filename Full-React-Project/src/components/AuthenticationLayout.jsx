
import React , {useEffect,useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"



function Protected(children , Authentication = true) {

const navigate = useNavigate() ;

const [loder,setLoder] = useState( true) ;

const authstatus = useSelector(state => state.auth.status)


useEffect(()=>{
    if(Authentication && authstatus != Authentication){
        navigate("/login")

    }
    else if (!Authentication && authstatus != Authentication) {
        navigate("/")
    }

    setLoder(false) ;

},[authstatus,navigate,Authentication])

  return loder ? <h1>Loading</h1> : <>{children} </>
}

export default Protected 