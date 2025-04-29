import React from 'react'
import FixedLayout from '../layouts/FixedLayout'

const NotFound = () => {
    return (
        <FixedLayout>
            <div className='w-full py-16 text-center'>
                <h1 className='text-7xl my-8'>404</h1>
                <h2 className='text-xl'>The page you are looking for doesn't exist</h2>
            </div>
        </FixedLayout>
    )
}

export default NotFound
