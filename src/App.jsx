import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/mainComponent/Footer'
import Contact from './containers/appStack/Contact'
import Home from './containers/appStack/Home'
import Shop from './containers/appStack/Shop'
import AppProvider from "./context/index"
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import AdminLogin from './containers/appStack/admin/AdminLogin'
import Dashbaord from './containers/appStack/admin/adminDashboard/Dashbaord'
import { AuthRoutes } from './routes/AuthRoutes'
import SingleProductPage from './components/SingleProductPage'
import UserForgotPassword from './containers/appStack/UserForgotPassword'
import AdminForgotPassword from './containers/appStack/AdminForgotPassword'
import Confeti from './containers/appStack/Confeti'
import ScrollToTop from './components/ScrollToTop'
import UserProfile from './containers/appStack/UserProfile'
import { ProtectedLayout } from './routes/ProtectedLayout'
function App() {
   const location = useLocation()
   const adminLoginRoutes = ['/admin/login','/dashboard','/admin/login/','/dashboard/','/admin/forgot-password/','/admin/forgot-password', '/paymentsuccess', '/paymentsuccess/']
   
   
   const isHide = adminLoginRoutes.includes(location.pathname)


  return (
    <AppProvider>
      <ScrollToTop/>
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Shop' element={<Shop/>}/>
      <Route path='/product/:id' element={<SingleProductPage/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/paymentsuccess' element={<Confeti/>}/>
      <Route path='/forgot-password' element={<UserForgotPassword/>}/>
      <Route path='/admin/forgot-password' element={<AdminForgotPassword/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path="/dashboard" element={<AuthRoutes />}>
      <Route path='/dashboard' element={<Dashbaord/>}/> 
      </Route>
      <Route path="/" element={<ProtectedLayout />}>
      <Route path='/profile' element={<UserProfile/>}/> 
      </Route>
      
    </Routes>
    {!isHide && <Footer/>}
    </AppProvider>
  )
}

export default App
