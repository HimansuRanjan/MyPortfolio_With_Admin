import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageTimeline from './pages/ManageTimeline'
import ManageProjects from './pages/ManageProjects'
import ViewProjects from './pages/ViewProjects'
import UpdateProject from './pages/UpdateProject'
// React toastify 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/usersSlice'
import "./App.css"
import { getAllMessages } from './store/slices/messagesSlice'
import { getAllTimelines } from './store/slices/timelineSlice'
import { getAllSkills } from './store/slices/skillSlice'
import { getAllApplications } from './store/slices/applicationSlice'
import { getAllProjects } from './store/slices/projectSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimelines());
    dispatch(getAllSkills());
    dispatch(getAllApplications());
    dispatch(getAllProjects());
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/password/forgot' element={<ForgotPassword/>}/>
          <Route path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route path='/manage/skills' element={<ManageSkills/>}/>
          <Route path='/manage/timeline' element={<ManageTimeline/>}/>
          <Route path='/manage/projects'element={<ManageProjects/>}/>
          <Route path='/view/project/:id' element={<ViewProjects/>}/>
          <Route path='/update/project/:id' element={<UpdateProject/>}/>
        </Routes>
      </Router>
      <ToastContainer position='bottom-right' theme='dark'/>
    </div>
  )
}

export default App
