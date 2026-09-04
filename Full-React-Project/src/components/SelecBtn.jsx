
import React, {useId} from 'react'

function SelecBtn ({
    label,
    options ,
    type =" button",
    className ="",
    ...props
},ref)  {

    const id = useId();
  return (
    <div className ="w-full">
        {label && <label className ='mb-1 block'
         htmlFor={ id}>
             {label} </label>}
             <select
             {...props}
             id={id}
             ref ={ref}
             className = {`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${className}  `}
             >
                {options ? options.map((option)=>(
                    <option key = {option.value} value ={option.value}>
                        
                    </option>
                )) : null}
             </select>
    </div>
  )
}


export default React.forwardRef(SelecBtn)