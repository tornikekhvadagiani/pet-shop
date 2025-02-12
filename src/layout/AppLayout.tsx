import { Outlet } from "react-router"
import Header from "../wedgest/Header"




const AppLayout = () => {
    return (
        <div>
            <Header/>
            <main>
                <Outlet/>  
            </main>
    
        </div>
      )
    }


export default AppLayout