import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import FixedLayout from '../layouts/FixedLayout'

const Login = () => {
    const {state} = useLocation();
    const redirectUrl = state?.redirectUrl || null;

    useEffect(() => {
        document.title = "Login";
    }, []);
  return (
    <>
     <FixedLayout>
        <LoginForm redirectUrl={redirectUrl}/>
     </FixedLayout> 
    </>
  )
}

export default Login
