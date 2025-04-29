import React, { useEffect, useState } from 'react'
import SignupForm from '../components/SignupForm'
import FixedLayout from '../layouts/FixedLayout'


const SignUp = () => {

    useEffect(() => {
        document.title = "Signup";
    }, []);
    return (
        <>
            <FixedLayout>
                <SignupForm />
            </FixedLayout>
        </>
    )
}

export default SignUp
