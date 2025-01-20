import React from 'react'
import Add_Project from './Add_Project'
import Project_Element from './Project_Element'

function Home() {
  return (
<div className='home-page-conatainer'>
<Add_Project />
<Project_Element card_no={1}/>
<Project_Element card_no={2}/>
<Project_Element card_no={3}/>
<Project_Element card_no={4}/>
<Project_Element card_no={5}/>
</div>
  )
}

export default Home