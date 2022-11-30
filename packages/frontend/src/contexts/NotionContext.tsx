import { Notion } from "@neurosity/notion";
import React, { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useOAuthResult } from "../hooks/useOAuthResult";

const notion = new Notion({
    deviceId: "26695cb90c0bfd619fc488adbe38cc8a"
})
const NotionContext = React.createContext<any>(notion)

export const useNotion = () => {
    return useContext(NotionContext)
}

const NotionContextProvider = ({children}: any) => {
    const location = useLocation()
    const clickRef = useRef(null)
    const {customToken} = useOAuthResult()
    useEffect(() => {
        const subscription = notion
            .onAuthStateChanged()
            .subscribe((user) => {
                console.log(user)
                if(user){
                    if(location.pathname === '/') {
                        // to login
                        // @ts-ignore
                        clickRef.current.click()
                    }
                }
            });
  
      return () => {
        subscription.unsubscribe();
      };
    }, [])

    useEffect(() => {
        if (customToken) {
            notion.login({ customToken }).catch((error: any) => {
              console.log(error)
              toast.error(error)
            })
            .then(data => {
                console.log(data)
            })
          }
    }, [customToken])

    return (
        <NotionContext.Provider value={notion}>
            {children}
            <a href="/track" ref={clickRef} className="hidden" ><p></p></a>
        </NotionContext.Provider>
    )
}

export default NotionContextProvider