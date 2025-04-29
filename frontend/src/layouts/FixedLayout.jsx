import React from "react";
import Navbar from "../components/Navbar";

const FixedLayout = ({ children }) => {
    return (
        <>
            <div className="relative bg-gray-50 h-screen w-screen overflow-x-hidden">
                <Navbar />
                {children}
            </div>

        </>
    )
}


export default FixedLayout;
