import { createContext, useState } from "react";




 export const PrevFormContext = createContext()


export const PrevFormContextWrapper = ({children}) => {





  const [prevFormData, setPreviousFormData] = useState({})


  return <PrevFormContext.Provider value={{prevFormData, setPreviousFormData}} >{children}</PrevFormContext.Provider>
}

