import React, {useId} from 'react'


const Input = React.forwardRef( function Input( {
    label,
    type = " text",
    className = "",
    ...props
}, ref){


     const id = useId() ;
    return (
        <div  className="w-full">
            {label && <label className ='mb-1 block'
             htmlFor={props.id || id}>
                 {label} </label>}
                 <input
                 type ={type}
                 className= {`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${className}  `}
                 ref = {ref}
                 {...props}
                 id ={id}
                 
                 />
        </div>
    )
})
 export default Input ;