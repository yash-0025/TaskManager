import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import getUsers from '../hooks/getUsers';
import FixedLayout from '../layouts/FixedLayout';
import validateManyFields from '../validations';

const Task = () => {
    const authState = useSelector(state => state.authReducer) || {};
    const navigate = useNavigate();
    const [fetchData, { loading, errorMsg }] = getUsers();
    const { taskId } = useParams();

    const mode = (taskId === undefined || taskId === "add") ? "add" : "update";
    console.log("Mode Detected :: ", mode);

    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        document.title = mode === "add" ? "Add Task" : "Update Task";
    }, [mode]);

    useEffect(() => {
        if (mode === "update" && taskId !== "add") {
            console.log("Fetching task data for ID:", taskId);
            const config = { 
                url: `/task/${taskId}`, 
                method: "get", 
                headers: { Authorization: authState.token } 
            };
            
            fetchData(config, { showSuccessToast: false })
                .then((data) => {
                    console.log("Task data received:", data);
                    if (data && data.task) {
                        setTask(data.task);
                        setFormData({ description: data.task.description || "" });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching task:", error);
                    navigate("/");
                });
        }
    }, [mode, authState.token, taskId, fetchData, navigate]);

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleReset = e => {
        e.preventDefault();
        setFormData({
            description: task?.description || ""
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        const errors = validateManyFields("task", formData);
        setFormErrors({});

        if (errors.length > 0) {
            setFormErrors(errors.reduce((total, ob) => ({
                ...total, [ob.field]: ob.err
            }), {}));
            return;
        }

        if (mode === "add") {
            const config = {
                url: "/task", 
                method: "post", 
                data: formData, 
                headers: { Authorization: authState.token }
            };
            
            fetchData(config)
                .then((response) => {
                    console.log("Task added successfully:", response);
                    navigate("/");
                })
                .catch(err => {
                    console.error("Error Adding Task", err);
                    setFormErrors({ submit: "Failed to add task. Please try again." });
                });
        }
        else {
            console.log("Updating existing task");
            const config = { 
                url: `/task/${taskId}`, 
                method: "put", 
                data: formData, 
                headers: { Authorization: authState.token } 
            };
            
            fetchData(config)
                .then((response) => {
                    console.log("Task updated successfully:", response);
                    navigate("/");
                })
                .catch(err => {
                    console.error("Error updating task:", err);
                    setFormErrors({ submit: "Failed to update task. Please try again." });
                });
        }
    }

    const fieldError = (field) => (
        <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
            <i className='mr-2 fa-solid fa-circle-exclamation'></i>
            {formErrors[field]}
        </p>
    )

    return (
        <FixedLayout>
            <div className="min-h-screen bg-gray-50 py-8">
                <form onSubmit={handleSubmit} className='m-auto max-w-[800px] bg-white p-8 border border-gray-200 shadow-lg rounded-lg'>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <h2 className='text-center mb-6 text-2xl font-bold text-gray-800'>
                                {mode === "add" ? "Add New Task" : "Edit Task"}
                            </h2>
                            
                            {errorMsg && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                                    {errorMsg}
                                </div>
                            )}
                            
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-700 font-medium mb-2 text-lg">
                                    Description
                                </label>
                                <Textarea 
                                    name="description" 
                                    id="description" 
                                    value={formData.description} 
                                    placeholder="Write your task description here..." 
                                    onChange={handleChange}
                                    className="min-h-[200px] text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {fieldError("description")}
                            </div>

                            <div className="flex gap-4 justify-end">
                                <button 
                                    type="button" 
                                    className='px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors duration-200' 
                                    onClick={() => navigate("/")}
                                >
                                    Cancel
                                </button>

                                {mode === "update" && (
                                    <button 
                                        type="button" 
                                        className='px-6 py-2.5 bg-blue-100 text-blue-700 font-medium rounded-md hover:bg-blue-200 transition-colors duration-200' 
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                )}

                                <button 
                                    type="submit" 
                                    className='px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200'
                                >
                                    {mode === "add" ? "Add Task" : "Update Task"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </FixedLayout>
    )
}

export default Task



