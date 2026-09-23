import React ,{useEffect , useState} from 'react'
import {Container , PostForm} from "../components"
import AppwriteService from "../appwrite/conf"

export const Home = () => {
   

    const [post ,setpost] = useState([])

 useEffect(()=>{}, [])

  AppwriteService.getPost().then((post)=> {
    if(post){
        setpost(post.documents)
    }
  })


 
   if(post.length === 0){
   return (
  <div className="w-full py-8">
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
)

   }  

}
