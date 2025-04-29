import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getUsers from "../hooks/getUsers";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip"

const Tasks = () => {
    const authState = useSelector(state => state.authReducer);
    const [tasks, setTasks] = useState([]);
    const [fetchData, { loading }] = getUsers();

    const fetchTasks = useCallback(() => {
        const config = { url: "/task", method: "get", headers: { Authorization: authState.token } };
        fetchData(config, { showSuccessToast: false })
            .then(data => setTasks(data.tasks))
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }, [authState.token, fetchData])

    useEffect(() => {
        if (!authState.isLoggedIn) return;
        fetchTasks();
    },[authState.isLoggedIn, fetchTasks]);

    const handleDelete = (id) => {
        const config = { url: `/task/${id}`, method: "delete", headers: { Authorization: authState.token } };
        fetchData(config)
            .then(() => fetchTasks())
            .catch(error => {
                console.error("Error deleting task:", error);
            });
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-[800px] mx-auto px-4">
                {tasks.length !== 0 && (
                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                        Your Tasks ({tasks.length})
                    </h2>
                )}
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks.length === 0 ? (
                            <div className='bg-white p-8 rounded-lg shadow-md text-center'>
                                <p className="text-gray-600 text-lg mb-4">No tasks found</p>
                                <Link 
                                    to="/task/add" 
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Add New Task
                                </Link>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div 
                                    key={task._id} 
                                    className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'
                                >
                                    <div className='flex items-center justify-between mb-4'>
                                        <span className='font-semibold text-gray-800'>
                                            Task #{index + 1}
                                        </span>

                                        <div className="flex items-center gap-4">
                                            <Tooltip text="Edit task" position="top">
                                                <Link 
                                                    to={`/task/${task._id}`} 
                                                    className='text-blue-600 hover:text-blue-800 transition-colors duration-200'
                                                >
                                                    <i className="fa-solid fa-pen text-lg"></i>
                                                </Link>
                                            </Tooltip>

                                            <Tooltip text="Delete task" position="top">
                                                <button 
                                                    onClick={() => handleDelete(task._id)}
                                                    className='text-red-600 hover:text-red-800 transition-colors duration-200'
                                                >
                                                    <i className="fa-solid fa-trash text-lg"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    
                                    <div className='text-gray-700 whitespace-pre-wrap'>
                                        {task.description}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tasks


