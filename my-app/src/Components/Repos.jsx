import React from 'react'
import {useOutletContext, Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import '../styles/repos.css'

function Repos() {
  const [repos, repoName] = useOutletContext();
  return (
    <div>
      <Helmet>
        <title>Repositories</title>
        <meta
        name="description"
        content="Stephanie Egbuonu's repositories "
         />
         <link rel="canonical" href="/repos/:repoName" />
      </Helmet>
      {repos.map((repo) => {
      const {name,created_at,has_pages,language,license,html_url,default_branch,id, ...rest} = repo
      if (name == repoName){
        return(
          <div className='repoDiv' key={id}>
            <p><span>Created on:</span> {created_at}</p>
            <p><span>Language:</span> {language}</p>
            <p><span>Defualt branch:</span> {default_branch}</p>
            {license == null ? <p><span>License:</span>None</p>:<p><span>License: </span>{license.name}</p> }
            <p><span>Visit repository:</span> <a href={`https://github.com/stephanniegb/${name}`} 
            target="_blank" rel="noopener noreferrer">{html_url}</a></p>
            <Link to={'/'} className='backBtn'>Back</Link>
          </div>
        )
      }
    })}
    </div>
  )
}

export default Repos