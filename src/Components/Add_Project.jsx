import React from 'react'
import { useContext } from 'react'
import AppContext from '../Context/AppContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { all } from 'axios'

function Add_Project() {

  const [Project_Title, setProject_Title] = useState("")
  const [Task_details, setTask_details] = useState([])
  const [Task_Link, setTask_Link] = useState('')

  ///// Getting theme from context to change the theme of the component
  const { theme, AddProject } = useContext(AppContext)

  ///// variable to track the new add task box
  let task_no = 1

  /////// Function to handle the adding of the task , When we click on the add button the new task box will be added
  const Task_adding_function = () => {

    let task_box_ = document.querySelector(`.task-box-${task_no} .task-add-btn`)
    task_box_.classList.add('none')
    task_box_.nextElementSibling.classList.remove('none')
    task_no += 1
    let task_box = document.createElement('div')
    task_box.classList.add('add-project-task')
    task_box.classList.add(`task-box-${task_no}`)
    task_box.classList.add(`styl-flx`)
    task_box.innerHTML = `
        <input type='text'minLength={1} required maxLength={50}  placeholder='Task Name' />
        <div class='task-add-btn'><i class="fa-solid fa-square-plus card-icons"></i></div>
        <div class='task-remove-btn none'><i class="fa-solid fa-square-minus card-icons"></i></div>
      `
    document.querySelector('.add-project-task-adding').appendChild(task_box)

    // Append the new task box to the container
    document.querySelector('.add-project-task-adding').appendChild(task_box);

    // Attach event listeners to the new buttons
    const new_add_btn = task_box.querySelector('.task-add-btn');
    const new_remove_btn = task_box.querySelector('.task-remove-btn');

    new_add_btn.addEventListener('click', Task_adding_function); // Attach event listener to the add button
    new_remove_btn.addEventListener('click', (e) => {
      task_box.remove(); // Remove the task box when the remove button is clicked

    });

  }

  const handelTitleChange = (e) => {
    setProject_Title(e.target.value)
  }

  const handelTaskCardSubmit = (e) => {
    //// required attribute is needed to make minLength and maxLength work
    e.preventDefault()
    const all_task_boxes = document.querySelectorAll('.add-project-task input')
    all_task_boxes.forEach((task_box) => {
      Task_details.push({ Title: task_box.value })
    })
    console.log(Task_details)
    console.log(Project_Title)
    console.log(Task_Link)
    AddProject(Project_Title, Task_Link, Task_details)
  }

  const handleTaskCardLinkSubmit = (e) => {
    e.preventDefault()
    setTask_Link(e.target[0].value)
  }

  return (
    <div>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" style={{ zIndex: "99999" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


      <div className='add-project-container'>
        <div className='add-project-box'>
          <h2 className={`${theme === "light" ? "" : "c-w"}`}> Add Project</h2>
          <form action="" onSubmit={handelTaskCardSubmit}>
            <div className="add-project-header styl-flx">
              <div className='add-project-input w100'>
                <input type='text' required minLength={1} id="Title" onChange={handelTitleChange} maxLength={50} placeholder='Project Name' />
              </div>
              <div className='add-project-input'>
                {/* <!-- Button trigger modal --> */}
                <div type="button" className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i className="fa-solid fa-link card-icons"></i>
                </div>

              </div>
            </div>
            <h4 className={`${theme === "light" ? "" : "c-w"}`}>Add Tasks</h4>
            <div className="add-project-task-adding">
              <div className='add-project-task task-box-1 styl-flx w100' id='task-box-1'>
                <input type='text' required minLength={1} className="" maxLength={50} placeholder='Task Name' />
                <div className='task-add-btn' onClick={Task_adding_function}><i className="fa-solid fa-square-plus card-icons"></i></div>
                <div className='none task-remove-btn ' onClick={() => { document.getElementById("task-box-1").remove() }}><i className="fa-solid fa-square-minus card-icons"></i></div>
              </div>
            </div>
            <div className="task-card-submit-button">
              <button type="submit" className="btn btn-primary">Add Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add_Project