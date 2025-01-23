import React from 'react'
import Add_Project from './Add_Project'
import Project_Element from './Project_Element'
import { useContext } from 'react'
import AppContext from '../Context/AppContext'

function Home() {
  const {Projects,setProjects,theme} = useContext(AppContext)
  return (
<div className='home-page-conatainer'>
<Add_Project />
<h3 style={{margin:"15px 0px 0px 5px"}} className={`${theme === "light" ? "" : "c-w"}`}>Your Projects</h3>
<div className={`Project-card-container ${theme === "light" ? "" : "c-w"}`}>
{ Projects.length == 0 && <h3 style={{margin:"15px 0px 0px 5px"}}>No Projects Found</h3>}
 { Projects.length != 0 && Projects.map((project,index) => {
    return <Project_Element card_no={index} project_id={project._id} key={project._id} project_name={project.Project_Name} project_link={project.link} pending_task={project.Pending_Task} completed_task={project.Completed_Task}/>})}
</div>
</div>
  )
}

export default Home