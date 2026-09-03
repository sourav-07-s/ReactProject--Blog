import {Container,LogoutBtn} from "../index"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

export const Header = () => {
 
  const AuthStatus = useSelector((state)=>{state.auth.status})

  const navigate = useNavigate();

  const navItem = [
    {
      name : "Home",
      path : "/", 
      active : true 
    }, {
    name: "Login",
    path: "/login",
    active: !AuthStatus
  },
  {
    name: "Sign Up",
    path: "/signup",
    active: !AuthStatus
  },
  {
    name: "All Posts",
    path: "/all-posts",
    active: AuthStatus
  },
  {
    name: "Add Post",
    path: "/add-post",
    active: AuthStatus
  }
  ]

  return (
    <header className ="py-3 shadow bg-gray-800" >
      <Container>
        <nav className="flex" >
          <div className="mr-4">
            <link
            to="/"
             className="font-extrabold" >
            logo
            </link>
          </div>
                   <ul className =" flex ml-auto">
                    {navItem.map((item)=> 
                    item.active ? (
                      <li key={item.name}>
                        <button
                        onClick={()=> navigate(item.slug)}

                        className="inline-block px-6 py-2 duration-200 hover:bg-violet-300 rounded-lg"
                        
                        >{item.name}</button>
                      </li>
                    ): null
                      
                    )}

                    {AuthStatus && (
                      <li>
                        <LogoutBtn/>
                      </li>
                    )}

                   </ul>

        </nav>
      </Container>
    </header>
  )
}
