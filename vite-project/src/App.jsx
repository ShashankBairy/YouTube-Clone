import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import {Provider} from 'react-redux'


function App() {
  
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}
  
export default App
