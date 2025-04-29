import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUsers from "../hooks/getUsers";
import validateManyFields from "../validations/index";
import Input from "./utils/Input";
import Loader from "./utils/Loader";


const SignupForm = () => {
    const [formError, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [fetchData, { loading }] = getUsers();
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit =  e => {
        e.preventDefault();
        const errors = validateManyFields("signup", formData);
        setFormErrors({});
        if (errors.length > 0) {
            setFormErrors(errors.reduce((total, ob) => ({
                ...total, [ob.field]: ob.err
            }), {}));
            return;
        }

        const config = { url: "/auth/signup", method: "post", data: formData };

        fetchData(config).then(() => {
            navigate("/login");
        });
        // try {
        //     await fetchData(config);
        //     toast.success("Registration successful!");
        //     navigate("/login");
        // } catch (error) {
        //     // Handle API errors
        //     const errorMsg = error.response?.data?.message || "Registration failed";
        //     toast.error(errorMsg);
            
        //     // Handle validation errors from server
        //     if (error.response?.data?.errors) {
        //         setFormErrors(error.response.data.errors);
        //     }
        // }
    }

    const fieldError = (field) => {
        <p className={`mt-1 text-pink-600 text-sm ${formError[field] ? "block" : "hidden"}`}> <i className='mr-2 fa-solid fa-circle-exclamation'></i>{formError[field]} </p>
    }

    return (
        <>
        <form className='m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md'>
        {
            loading ? (
                <Loader />
            ) : (
                <>
                <h2 className='text-center mb-4'>Welcome user, Please Signup here</h2>

                <div className="mb-4">
              <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
              {fieldError("name")}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>

            <button className='bg-green-500 rounded  text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

            <div className='pt-4'>
              <Link to="/login" className='text-blue-400'>Already have an account? Login here</Link>
            </div>
                </>
            )
        }
        </form>
        </>
    )
}

export default SignupForm