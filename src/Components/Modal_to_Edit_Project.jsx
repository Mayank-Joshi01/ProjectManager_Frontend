import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AppContext from '../Context/AppContext';

const Modal_to_Edit_Project = forwardRef((props, ref) => {
  // State Management
  const [projectTitle, setProjectTitle] = useState(props.Title);
  // Initialize with empty task if no tasks provided
  const [tasks, setTasks] = useState(props.Pending_Task?.length ? props.Pending_Task : [{ Title: "" }]);
  const [projectLink, setProjectLink] = useState(props.Link);
  
  // Refs and Context
  const modalCloseRef = useRef(null);
  const { theme, UpdateProject } = useContext(AppContext);

  // Initialize state with props
  useEffect(() => {
    setProjectTitle(props.Title);
    // Ensure at least one task exists when props change
    setTasks(props.Pending_Task?.length ? props.Pending_Task : [{ Title: "" }]);
    setProjectLink(props.Link);
    console.log("changes occured")
  }, [props.Title, props.Pending_Task, props.Link]);

  // Task Management Handlers
  const addTaskField = () => {
    setTasks([...tasks, { Title: "" }]);
  };

  const removeTaskField = (index) => {
    // Prevent removing the last task
    if (tasks.length === 1) return;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleTaskInputChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].Title = value;
    setTasks(updatedTasks);
  };

  // Form Submission Handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    
    try {
      submitButton.disabled = true;
      const success = await UpdateProject(
        props.Project_id,
        projectTitle,
        projectLink,
        tasks,
        []
      );
      
      if (success) {
        modalCloseRef.current?.click();
      }
    } finally {
      submitButton.disabled = false;
    }
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    setProjectLink(e.target.elements.link.value);
  };

  return (
    <div>
      {/* Hidden Trigger Button */}
      <button
        type="button"
        className="d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target={`#editProjectModal${props.modal_No}`}
      >
        Open Edit Modal
      </button>

      {/* Link Input Modal */}
      <div
        className="modal fade"
        id={`linkModal${props.modal_No}`}
        data-bs-backdrop="static"
        style={{ zIndex: 99999 }}
      >
        <div className="modal-dialog">
          <div className={`modal-content ${theme === "light" ? "" : "bg-dark text-light"}`}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Project Link</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleLinkSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter project URL"
                    defaultValue={projectLink}
                    name="link"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Edit Project Modal */}
      <div
        className={`modal fade`}
        id={`editProjectModal${props.modal_No}`}
        style={{ zIndex: 99999 }}
      >
        <div className="modal-dialog">
          <div className={`modal-content ${theme === "light" ? "" : "bg-dark text-light"}`}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Project</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={modalCloseRef}
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleProjectSubmit}>
                {/* Project Header */}
                <div className="d-flex gap-2 mb-4">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="Project Name"
                      required
                      minLength={1}
                      maxLength={50}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target={`#linkModal${props.modal_No}`}
                  >
                    <i className="fa-solid fa-link" />
                  </button>
                </div>

                {/* Task Management */}
                <div className="mb-4">
                  <h5>Project Tasks</h5>
                  <div className="vstack gap-2">
                    {tasks.map((task, index) => (
                      <div key={index} className="d-flex gap-2 align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          value={task.Title}
                          onChange={(e) => handleTaskInputChange(index, e.target.value)}
                          placeholder={`Task ${index + 1}`}
                          required
                          minLength={1}
                          maxLength={50}
                        />
                        <div className="btn-group">
                          {index === tasks.length - 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={addTaskField}
                            >
                              <i className="fa-solid fa-square-plus" />
                            </button>
                          )}
                          {tasks.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeTaskField(index)}
                              // Disable remove button if only one task remains
                              disabled={tasks.length === 1}
                            >
                              <i className="fa-solid fa-square-minus" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal_to_Edit_Project;