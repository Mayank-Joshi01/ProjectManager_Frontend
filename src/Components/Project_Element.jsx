import React,{ useRef,useState } from 'react'
import { useContext } from 'react'
import AppContext from '../Context/AppContext'
import { NavLink } from 'react-router-dom'
import Modal_to_Edit_Project from './Modal_to_Edit_Project'

function Project_Element(props) {

    /////// to Ref the Edit Modal
    const inputRef = useRef();

    /////// Getting the date when the task is completed
    const current_date = new Date()
    const date = current_date.toDateString()

    /////// State to store the Completed Task and Pending Task
    const [Completed_Task, setCompleted_Task] = useState(props.completed_task)

    const [Pending_Task, setPending_Task] = useState(props.pending_task)

    //////// Getting theme from context to change the theme of the component
    const { theme, DeleteProject,UpdateProject } = useContext(AppContext);

    /////// Function to handle the task completed , When we click on Checkbox the task will be completed
    const handelTaskCompleted = (e,id) => {
        const Task_Got_Complted = e.target.parentElement
        Task_Got_Complted.style.width = "24px"
        setTimeout(() => { 
            Task_Got_Complted.style.display = "none";
            Completed_Task.push({ Title: Task_Got_Complted.innerText, Completed_At: date });
            Pending_Task.splice(id, 1)
            setCompleted_Task([...Completed_Task])
        setPending_Task([...Pending_Task])
        UpdateProject(props.project_id, props.project_name, props.project_link, Pending_Task,Completed_Task)
        }, 2000)
        

    }

    /////// Function to handle the delete of the completed task , When we click on delete icon the task will be deleted
    const handeldeleteCompletedTask = (e,id) => {
        const Completed_Task_item = e.target.nextSibling
        Completed_Task_item.style.display = "block"
        Completed_Task_item.style.backdropFilter = "blur(50px)" ////// Using backdropFilter to make the animation smooth
        Completed_Task_item.style.opacity = "1" ////// Using opacity tom make the animation smooth
        const Completed_Task_item_Parent = e.target.parentElement
        setTimeout(() => { Completed_Task_item_Parent.style.display = "none" ;
        Completed_Task.splice(id, 1)
        setCompleted_Task([...Completed_Task])
        UpdateProject(props.project_id, props.project_name, props.project_link, Pending_Task,Completed_Task)
        }, 1000) ////// To hide the task after the element deleted
    }

    /////// Function to handle the toggle of the task , When we click on the toggle button the task will be toggled form pending to completed and vice versa
    /////// Using the setTimeout so that the component get render first so that we can target the elements
    setTimeout(() => {
        const Task_Toggle_button = document.querySelectorAll(`.card-toggle-buttons .card${props.card_no}`);
        Task_Toggle_button.forEach((element, id) => {
            element.addEventListener('click', () => {
                element.classList.remove('inactive-card-task-link');
                element.classList.add('active-card-task-link');
                if (id === 0) {
                    document.querySelector(`.Pending-Tasks-box${props.card_no} `).style.display = "block";
                    document.querySelector(`.Completed-Tasks-box${props.card_no}`).style.display = "none";
                }
                else {
                    document.querySelector(`.Pending-Tasks-box${props.card_no} `).style.display = "none";
                    document.querySelector(`.Completed-Tasks-box${props.card_no}`).style.display = "block";
                }
                Task_Toggle_button.forEach((element1, id1) => {
                    if (element1 !== element) {
                        element1.classList.remove('active-card-task-link');
                        element1.classList.add('inactive-card-task-link');
                    }
                });
            });

        })
    }, 10);


    /////// Function to handle the edit of the project , When we click on the edit icon the modal will be opened
    const handel_Edit_Modal = () => {
        inputRef.current.click();
    }


    /////// Function to handle the delete of the project , When we click on the delete icon the project will be deleted
    const handelProjectDelete = (id) => {
        DeleteProject(id)
    }

    return (
        <div>
            <Modal_to_Edit_Project ref={inputRef} modal_No={props.card_no} Project_id={props.project_id} Title={props.project_name} Pending_Task={props.pending_task} Link={props.project_link}/>

            <div className={`card ${theme === "light" ? "" : "c-w"} `} style={{ width: "20rem" }}>
                <div className={`card-body ${theme === "light" ? "" : "c-w bg-d"}`}>

                    {/* //////// Card Header , Contain the title of the card and the link to vist the Project */}
                    <div className="my-card-header styl-flx">
                        <h5 className="card-title d-i-b">{props.project_name}</h5>
                        <NavLink to={props.project_link} ><button type="button" className="btn btn-primary">Visit</button></NavLink>

                    </div>

                    {/* ////////  Toggle Section , Pending_Task and Completed_Task */}
                    <div className="card-toggle-buttons styl-flx" >
                        <p className={`d-i-b m0p0 Ptasks c-p active-card-task-link card${props.card_no}`} >Pending Tasks</p>
                        <p className={`d-i-b m0p0 Ctasks c-p inactive-card-task-link card${props.card_no}`} >Completed Task</p>
                    </div>
                    <hr className='m0p0' />

                    {/* ////// Pending Task Section */}
                    <div className={`card form-check Pending-Tasks-box Pending-Tasks-box${props.card_no} ${theme === "light" ? "" : "c-w bg-d"}`}>

                        {/* //////// List of Pending Task */}
                        <ul className="list-group list-group-flush styl-flx">

                        {Pending_Task.length === 0 && <h4 style={{ margin: "15px 0px 0px 5px" }} className={`${theme === "light" ? "" : "c-w"}`}>All Task Completed</h4>}
                            {/* //////// Generating list of Pending Task */}
                            {Pending_Task.map((task, index) => {
                                return <li key={index} className={`list-group-item Pending-Task-List-item styl-flx ${theme === "light" ? "" : "c-w"} ${theme === "light" ? "" : "c-w bg-d"}`}>
                                    <input  onChange={(e) => handelTaskCompleted(e, index)} className="form-check-input pending-task-checkbox" type="checkbox"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {task.Title}
                                    </label>
                                </li>

                            })}
                        </ul>
                    </div>

                    {/* ////// Completed Task Section */}
                    <div className={`card form-check Completed-Tasks-box Completed-Tasks-box${props.card_no} ${theme === "light" ? "" : "c-w bg-d"}`} style={{ display: "none" }}>

                        {/* //////// List of Completed Task */}
                        <ul className="list-group list-group-flush ">

                            {/* //////// Generating list of Completed Task */}
                            {
                                Completed_Task.map((task, index) => {
                                    return <li key={index} className={` list-group-item Completed_Task_items w100 styl-flx ${theme === "light" ? "" : "c-w"} ${theme === "light" ? "" : "c-w bg-d"}`} style={{ paddingLeft: "0px" }}>
                                        <div className='d-i-b'>
                                            <p className='m0p0'>{task.Title}</p>
                                            <div id="emailHelp" className={`form-text ${theme === "light" ? "" : "c-wheat"}`} >Completed on {task.Completed_At}</div>
                                        </div>
                                        <i onClick={(e)=>{handeldeleteCompletedTask(e,index)}} className="fa-regular fa-trash-can icon"></i>
                                        <div className="overlay"></div>
                                    </li>

                                }
                                )}

                        </ul>
                    </div>

                    {/* ////// Functionality Section , Edit and Delete */}
                    <div className='Task-card-functonality styl-flx'>

                        
                        <i className="fa-solid fa-pen-to-square icon" onClick={handel_Edit_Modal}></i>
                        <i className="fa-regular fa-trash-can icon" onClick={() => { handelProjectDelete(props.project_id) }}></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Project_Element