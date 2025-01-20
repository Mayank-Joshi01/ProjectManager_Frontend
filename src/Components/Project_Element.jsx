import React from 'react'
import { useContext } from 'react'
import AppContext from '../Context/AppContext'

function Project_Element(props) {

    // const {theme} = useContext(AppContext)
const theme = "light"

        setTimeout(() => {
        const Task_Toggle_button = document.querySelectorAll(`.card-toggle-buttons .card${props.card_no}`);
        console.log(Task_Toggle_button);
        Task_Toggle_button.forEach((element,id) => {
            element.addEventListener('click', () => {
                element.classList.remove('inactive-card-task-link');
                element.classList.add('active-card-task-link');
console.log(id)
                if(id === 0){
                    console.log("one")
                    document.querySelector(`.Pending-Tasks-box${props.card_no} `).style.display = "block";
                    document.querySelector(`.Completed-Tasks-box${props.card_no}`).style.display = "none";
                }
                else{
                    console.log("two")
                    document.querySelector(`.Pending-Tasks-box${props.card_no} `).style.display = "none";
                    document.querySelector(`.Completed-Tasks-box${props.card_no}`).style.display = "block";
                }
                Task_Toggle_button.forEach((element1,id1) => {
                    console.log(id1);
                    if(element1 !== element){
                        element1.classList.remove('active-card-task-link');
                        element1.classList.add('inactive-card-task-link');
                    }
                });
        });

    })}, 10);
 
    return (
        <>
            <div className={`card ${theme==="light"?"":"c-w"} `} style={{ width: "18rem" }}>
                <div className={`card-body ${theme==="light"?"":"c-w bg-d"}`}>
                    <div className="my-card-header styl-flx">
                        <h5 className="card-title d-i-b">Card title</h5>
                        <button type="button" className="btn btn-primary">Primary</button>
                    </div>
                    <div className="card-toggle-buttons styl-flx" >
                        <p className={`d-i-b m0p0 Ptasks c-p active-card-task-link card${props.card_no}`} >Pending Tasks</p>
                        <p className={`d-i-b m0p0 Ctasks c-p inactive-card-task-link card${props.card_no}`} >Completed Task</p>
                    </div>
                    <hr  className='m0p0'/>
                    <div className={`card form-check Pending-Tasks-box Pending-Tasks-box${props.card_no} ${theme==="light"?"":"c-w bg-d"}`}>
                        <ul className="list-group list-group-flush ">
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>
                            <li className={`list-group-item ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </li>

                        </ul>
                    </div>

                    <div className={`card form-check Completed-Tasks-box Completed-Tasks-box${props.card_no} ${theme==="light"?"":"c-w bg-d"}`} style={{display:"none"}}>
                        <ul className="list-group list-group-flush ">
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                            <li className={` list-group-item w100 styl-flx ${theme==="light"?"":"c-w"} ${theme==="light"?"":"c-w bg-d"}`} style={{paddingLeft:"0px"}}>
                                <div className='d-i-b'>
                                <p className='m0p0'>Task 0000001</p>
                                <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-wheat"}`} >Completed on 01/01/2025</div>
                                </div>
                                <i className="fa-regular fa-trash-can icon"></i>
                            </li>
                        </ul>
                    </div>
                    <div className='Task-card-functonality styl-flx'>
                    <i className="fa-solid fa-pen-to-square icon"></i>
                    <i className="fa-regular fa-trash-can icon"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project_Element