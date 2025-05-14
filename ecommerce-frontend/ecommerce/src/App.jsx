import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import Layout from './pages/Layout'
import { Products } from "./pages/Products.jsx"
import CartPage from "./pages/CartPage.jsx"



function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path = "/"  element={<Layout />}>
          <Route path = "/"  element={<Products/>}/>
          <Route path = "sign-up"  element={<SignUp/>}/>
          <Route path = "sign-in"  element={<SignIn/>}/>
          <Route path = "cart"  element={<CartPage/>}/>
      </Route>
     </Routes>

    </BrowserRouter>
  )
}

export default App
