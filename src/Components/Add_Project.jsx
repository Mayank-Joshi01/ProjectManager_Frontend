// Import necessary React hooks and components
import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import { Link } from 'react-router-dom';

function Add_Project() {
  // State management for form inputs
  const [projectTitle, setProjectTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState([]);
  const [taskLink, setTaskLink] = useState('');
  const [tasks, setTasks] = useState([{ id: 1 }]); // Track task inputs

  // Access context values for theme and project addition
  const { theme, AddProject } = useContext(AppContext);

  // Handle project title input changes
  const handleTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  // Add new task input field
  const addTaskField = () => {
    setTasks([...tasks, { id: tasks.length + 1 }]);
  };

  // Remove task input field
  const removeTaskField = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Handle project form submission
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    // Collect all task inputs
    const taskInputs = Array.from(document.querySelectorAll('.task-input-group input'))
      .map(input => ({ Title: input.value }));

    // Add project through context
    AddProject(projectTitle, taskLink, taskInputs);

    // Reset form state
    setProjectTitle("");
    setTaskLink("");
    setTasks([{ id: 1 }]);
  };

  // Handle link submission from modal
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    setTaskLink(e.target[0].value);
  };

  return (
    <div className={`${theme === "light" ? "" : "dark-theme"}`}>
      {/* Link Input Modal */}
      <div className="modal fade" id="linkModal" style={{ zIndex: "99999" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Project Link</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleLinkSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter project URL"
                    aria-label="Project link"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Save Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Project Form */}
      <div className='add-project-container'>
        <div className='add-project-box'>
          <h2 className={theme === "light" ? "" : "text-light"}>Add Project</h2>

          <form onSubmit={handleProjectSubmit}>
            {/* Project Header Section */}
            <div className="project-header">
              <div className='project-title-input'>
                <input
                  type="text"
                  required
                  minLength={1}
                  maxLength={50}
                  value={projectTitle}
                  onChange={handleTitleChange}
                  placeholder='Project Name'
                />
              </div>
              <div className='project-link-button' data-bs-toggle="modal" data-bs-target="#linkModal">
                <i className="fa-solid fa-link"></i>
              </div>
            </div>

            {/* Task Input Section */}
            <h4 className={theme === "light" ? "" : "text-light"}>Project Tasks</h4>
            <div className="task-inputs-container">
              {tasks.map((task, index) => (
                <div key={task.id} className="task-input-group">
                  <input
                    type="text"
                    required
                    minLength={1}
                    maxLength={50}
                    placeholder={`Task ${index + 1}`}
                  />
                  <div className="task-controls">
                    {index === tasks.length - 1 && (

                      <div onClick={addTaskField}>
                        <i className="fa-solid fa-square-plus"></i>
                      </div>
                    )}
                    {tasks.length > 1 && (
                      <div onClick={() => removeTaskField(task.id)}>
                        <i className="fa-solid fa-square-minus"></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Submission */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add_Project;