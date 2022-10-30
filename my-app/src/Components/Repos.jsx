import React from 'react'
import {useOutletContext, Link} from 'react-router-dom'
import '../styles/repos.css'

function Repos() {
  const [repos, repoName] = useOutletContext();
  return (
    <div>
      {repos.map((repo) => {
      const {name,created_at,has_pages,language,license,html_url,default_branch, ...rest} = repo
      console.log(license);
      if (name == repoName){
        return(
          <div className='repoDiv'>
            <p><span>Created on:</span> {created_at}</p>
            <p><span>Language:</span> {language}</p>
            <p><span>Defualt branch:</span> {default_branch}</p>
            <p><span>License:</span> {license.name}</p>
            <p><span>Visit repository:</span> <a href={`https://github.com/stephanniegb/${name}`} 
            target="_blank" rel="noopener noreferrer">{html_url}</a></p>
            <Link to={'/'}>Back</Link>
          </div>
        )
      }
    })}
    </div>
  )
}

export default Repos