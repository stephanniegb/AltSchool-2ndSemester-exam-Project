import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { ErrorBoundary, ErrorPage, Home, NoPage, Repos } from '../Components'



function Routing() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}>
      <Route path='repos/:repoName' element={<Repos/>}/>
    </Route>
    <Route path='*' element={<NoPage/>}/>
    <Route path='/error' element={
      <ErrorBoundary>
        <ErrorPage/>
      </ErrorBoundary>
    }/>
   </Routes>
   </>
  )
}

export default Routing