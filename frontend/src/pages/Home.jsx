import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import FixedLayout from "../layouts/FixedLayout";

const Home = () => {
    const authState = useSelector(state => state.authReducer);
    const { isLoggedIn, user } = authState;

    useEffect(() => {
        document.title = isLoggedIn ? `${user?.name || "User"}'s Tasks` : "Task Manager";
    }, [authState, isLoggedIn, user?.name]);

    return (
        <FixedLayout>
            {!isLoggedIn ? (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                Welcome to Task Manager
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Organize your tasks efficiently and boost your productivity with our simple and intuitive task management system.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-blue-600 mb-4">
                                    <i className="fas fa-tasks text-4xl"></i>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
                                <p className="text-gray-600 mb-6">
                                    Create an account to start managing your tasks effectively. It's free and takes just a minute.
                                </p>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Sign Up Now
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </Link>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-green-600 mb-4">
                                    <i className="fas fa-sign-in-alt text-4xl"></i>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Already a User?</h2>
                                <p className="text-gray-600 mb-6">
                                    Log in to access your tasks and continue where you left off.
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                    Log In
                                    <i className="fas fa-sign-in-alt ml-2"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Task Manager?</h2>
                            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-blue-500 mb-3">
                                        <i className="fas fa-check-circle text-3xl"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Simple & Intuitive</h3>
                                    <p className="text-gray-600">Easy to use interface for managing your tasks efficiently</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-blue-500 mb-3">
                                        <i className="fas fa-clock text-3xl"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Save Time</h3>
                                    <p className="text-gray-600">Quick task creation and management to boost productivity</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-blue-500 mb-3">
                                        <i className="fas fa-shield-alt text-3xl"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Private</h3>
                                    <p className="text-gray-600">Your data is protected with industry-standard security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome back, {user?.name || "User"}!
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your tasks efficiently and stay organized.
                            </p>
                        </div>
                        <Tasks />
                    </div>
                </div>
            )}
        </FixedLayout>
    );
}

export default Home;