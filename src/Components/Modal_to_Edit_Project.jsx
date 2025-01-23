import React, { forwardRef, useRef } from 'react'
import { useContext } from 'react'
import AppContext from '../Context/AppContext'
import { useState } from 'react'

const Modal_to_Edit_Project = forwardRef((props, ref) => {

    ////// To handel the closing of the modal on Save Sucessfully
    const ref_ = useRef(null)


    const [Project_Title, setProject_Title] = useState(props.Title)
    const [Task_details_, setTask_details_] = useState(props.Pending_Task)
    const [Task_Link, setTask_Link] = useState(props.Link)

    ///// Getting theme from context to change the theme of the component
    const { theme, UpdateProject } = useContext(AppContext)



    /////// Function to handle the adding of the task , When we click on the add button the new task box will be added
    const Task_adding_function = () => {

        ///// variable to track the new add task box
        let task_no = Task_details_.length
        
        Task_details_.push({ Title: "" })
        let task_box_ = document.querySelector(`.Edit-task-box-${props.modal_No}${task_no} .task-add-btn`)
        task_no += 1
        task_box_.classList.add('none')
        task_box_.nextElementSibling.classList.remove('none')
        let task_box = document.createElement('div')
        task_box.classList.add('Edit-add-project-task')
        task_box.classList.add(`Edit-task-box-${props.modal_No}${task_no}`)
        task_box.classList.add(`styl-flx`)
        task_box.innerHTML = `
        <input type='text'minLength={1} required maxLength={50}  placeholder='Task Name' />
        <div class='task-add-btn'><i class="fa-solid fa-square-plus card-icons"></i></div>
        <div class='task-remove-btn none'><i class="fa-solid fa-square-minus card-icons"></i></div>
      `
        document.querySelector(`.Edit-add-project-task-adding${props.modal_No}`).appendChild(task_box)

        // Append the new task box to the container
        document.querySelector(`.Edit-add-project-task-adding${props.modal_No}`).appendChild(task_box);

        // Attach event listeners to the new buttons
        const new_add_btn = task_box.querySelector('.task-add-btn');
        const new_remove_btn = task_box.querySelector('.task-remove-btn');
        const new_task_input = task_box.querySelector('input');

        new_task_input.addEventListener('input', (e) => { handel_Task_input(task_no - 1, e.target.value) })
        new_add_btn.addEventListener('click', Task_adding_function); // Attach event listener to the add button
        new_remove_btn.addEventListener('click', (e) => {
            Task_details_.splice(task_no - 1, 1)
            console.log("h")
            task_box.remove(); // Remove the task box when the remove button is clicked

        });

    }

    ////// handeling change in the title of the project
    const handelTitleChange = (e) => {
        setProject_Title(e.target.value)
    }

    const handelTaskEditSubmit = (e) => {
        ////Note: required attribute is needed to make minLength and maxLength work
        e.preventDefault()
        console.log("ji")
        const submitButton = e.nativeEvent.submitter;
        submitButton.setAttribute("disabled", true)
        console.log(Task_details_)
        console.log(Project_Title)
        console.log(Task_Link)
        const its_Edited = UpdateProject(props.project_id, Project_Title, Task_Link, Task_details_)
        if (its_Edited) {
            submitButton.removeAttribute("disabled")
            ref_.current.click()
        }
    }

    /////// handeling change in the link of the project
    const handleTaskCardLinkSubmit = (e) => {
        e.preventDefault();
        setTask_Link(e.target[0].value)
    }

    ///////// to handle the input of the task
    const handel_Task_input = (index, value) => {
        Task_details_[index].Title = value
        setTask_details_(Task_details_)
    }

    return (
        <div>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary none" ref={ref} data-bs-toggle="modal" data-bs-target={`#exampleModal${props.modal_No}`}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            {/* Child Modal */}
            <div className="modal fade" id={`exampleLinkModal${props.modal_No}`} data-bs-backdrop="static" data-bs-keyboard="false" style={{ zIndex: "99999" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleTaskCardLinkSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Link Here" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            {/* Parent Modal */}
            <div className={`modal fade`} id={`exampleModal${props.modal_No}`} tabIndex="-1" style={{ zIndex: "99999" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${theme === "light" ? "" : "c-w bg-d"}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className='add-project-container'>
                                <div className='add-project-box'>
                                    <h2 className={`${theme === "light" ? "" : "c-w"}`}> Add Project</h2>
                                    <form action="" onSubmit={handelTaskEditSubmit}>
                                        <div className="add-project-header styl-flx">
                                            <div className='add-project-input w100'>
                                                <input type='text' required minLength={1} defaultValue={props.Title} id="Title" onChange={handelTitleChange} maxLength={50} placeholder='Project Name' />
                                            </div>
                                            <div className='add-project-input'>
                                                {/* <!-- Button trigger modal --> */}
                                                <div type="button" className="" data-bs-toggle="modal" data-bs-target={`#exampleLinkModal${props.modal_No}`}>
                                                    <i className="fa-solid fa-link card-icons"></i>
                                                </div>

                                            </div>
                                        </div>
                                        <h4 className={`${theme === "light" ? "" : "c-w"}`}>Add Tasks</h4>
                                        <div className={`Edit-add-project-task-adding${props.modal_No}`}>
                                            {
                                                Task_details_.map((task, index) => {
                                                    return <div key={index} className={`Edit-add-project-task Edit-task-box-${props.modal_No}${index + 1} styl-flx w100`}>
                                                        <input type='text' required minLength={1} className="" maxLength={50} value={task.Title} onChange={(e) => { handel_Task_input(index, e.target.value) }} placeholder='Task Name' />
                                                        <div className='task-add-btn' onClick={Task_adding_function}><i className="fa-solid fa-square-plus card-icons"></i></div>
                                                        <div className='none task-remove-btn ' onClick={() => { document.querySelector(`.Edit-task-box-${index + 1}`).remove() }}><i className="fa-solid fa-square-minus card-icons"></i></div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" ref={ref_} data-bs-dismiss="modal">Close</button>
                                            {/* //////// Note : e.target refers to the DOM element triggered the event  */}
                                            <button type="submit" className="btn btn-primary" >Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
})

export default Modal_to_Edit_Project