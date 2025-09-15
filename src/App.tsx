import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './Home/home'
import { Dashboard } from './DashBoard/dashboard'
import { UploadPage } from './Upload/UploadPage'
import { AnalysisPage } from './Analysis/AnalysisPage'
import { SettingsPage } from './Settings/SettingsPage'
import LegalAnalyzer from './Components/Analyzer/LegalAnalyzer'
import Templates from './Components/Templates/Templates'
import Reports from './Components/Reports/Reports'
import ExpandableCardDemo from './DashBoard/click'
import { Timetable } from './DashBoard/chat_class'
import { Search } from './DashBoard/search'
import { EventSRM } from './DashBoard/event'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/upload' element={<UploadPage/>}/>
      <Route path='/analyzer' element={<LegalAnalyzer/>}/>
      <Route path='/templates' element={<Templates/>}/>
      <Route path='/reports' element={<Reports/>}/>
      <Route path='/analysis/:id' element={<AnalysisPage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      {/* Legacy routes for backward compatibility */}
      <Route path='/Dash' element={<Dashboard/>}/>
      <Route path='/Time' element={<Timetable/>}/>
      <Route path='/Search' element={<Search/>}/>
      <Route path='/Event' element={<EventSRM/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
