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
    const [showPassword, setShowPassword] = useState(false);

    const [fetchData, { loading }] = getUsers();
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
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
    }

    const fieldError = (field) => (
        <p className={`mt-1 text-pink-600 text-sm ${formError[field] ? "block" : "hidden"}`}>
            <i className='mr-2 fa-solid fa-circle-exclamation'></i>
            {formError[field]}
        </p>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us to start managing your tasks
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        placeholder="John Doe"
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                                {fieldError("name")}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        placeholder="youremail@domain.com"
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                                {fieldError("email")}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        placeholder="Create a strong password"
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <i className="fas fa-eye-slash"></i>
                                        ) : (
                                            <i className="fas fa-eye"></i>
                                        )}
                                    </button>
                                </div>
                                {fieldError("password")}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <i className="fas fa-user-plus"></i>
                                </span>
                                Sign up
                            </button>
                        </div>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Already have an account? Sign in here
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignupForm;