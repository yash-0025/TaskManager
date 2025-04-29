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
    const [fetchData, { loading }] = getUsers();
    const { taskId } = useParams();

    const mode = taskId === undefined ? "add" : "update";
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        document.title = mode === "add" ? "Add Task" : "Update Task";
    }, [mode]);

    useEffect(() => {
        if (mode === "update") {
            const config = { url: `/task/${taskId}`, method: "get", headers: { Authorization: authState.token } }
            fetchData(config, { showSuccessToast: false }).then((data) => {
                setTask(data.task);
                setFormData({ description: data.task?.description || "" });
            }).catch(() => {
                navigate("/");
            })
        }
    }, [mode, authState.token, taskId, fetchData]);

    const handleChange = e => {
        console.log("Clicked ADD");
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
        
    }

    const handleReset = e => {
        e.preventDefault();
        setFormData({
            description: task.description
        });
    }
    const handleSubmit = e => {
        e.preventDefault();
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
                url: "/task", method: "post", data: formData, headers: { Authorization: authState.token }
            }
            fetchData(config).then(() => {
                navigate("/");
            });
        }
        else {
            const config = { url: `/task/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
            fetchData(config).then(() => {
                navigate("/");
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
        <>

            <FixedLayout>
                <form onSubmit={handleSubmit}
                className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
                            <div className="mb-4">
                                <label htmlFor="description">Description</label>
                                <Textarea name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} />
                                {fieldError("description")}
                            </div>

                            <button type="submit" className='bg-black-100 text-white px-4 py-2 font-medium hover:bg-gray-400' >
                            
                            {mode === "add" ? "Add task" : "Update Task"}</button>

                            <button type="button" className='ml-4 bg-red-500 text-white px-4 py-2 font-medium' onClick={() => navigate("/")}>Cancel</button>


                            {mode === "update" &&
                            <button type="button" className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600' onClick={handleReset}>Reset</button>}
                        </>
                    )}
                </form>
            </FixedLayout>


           
            )



        </>
    )
}

export default Task
