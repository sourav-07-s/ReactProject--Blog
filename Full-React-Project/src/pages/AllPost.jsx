
import React , {useState , useEffect} from 'react'

import {Container , PostCard} from "../components"
import AppwriteService from "../appwrite/conf"

const AllPost = () => {

 const [post ,setpost] = useState([])
 useEffect(()=>{}, [])

  AppwriteService.getPost([]).then((post)=> {
    if(post){
        setpost(post.documents)
    }
  })

  return (
    <div  className= " w-full py-8">
        <Container>
           <div className="flex flex-wrap " > 
             {post.map((post)=>(
                <div key = {post.$id}  className= "p-2 w-1/4" > 
                  <PostCard post ={post} />
                </div>
            ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPost