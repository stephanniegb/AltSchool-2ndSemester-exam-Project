import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/home.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faLink, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import { Pagination, Loader } from './index';
import {Helmet} from 'react-helmet-async'

function Home() {
  const [github, setGithub] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {repoName} = useParams()

  useEffect(() => {
    requestGithub();
  }, []);

  async function requestGithub() {
    const response = await fetch(`https://api.github.com/users/stephanniegb`);
    const res = await fetch("https://api.github.com/users/stephanniegb/repos");
    if (response.ok) {
      const git = await response.json();
      const repoObj = await res.json();
      setGithub(git);
      setRepos(repoObj);
      setIsLoading(false);
    } else {
      const message = `An error has occurred: ${response.status}`;
      console.error(message);
    }
  }
  
  return (
    <div >
      <Helmet>
        <title>Home page</title>
        <meta
        name="description"
        content="Stephanie Egbuonu's github profile "
         />
         <link rel="canonical" href="/" />
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="home_container">
          <section className="info_wrapper">
            
            <div>
              <img src={github.avatar_url} alt="profile photo" />
            </div>
            <div>
              <h1>{github.name}</h1>
              <h3>{github.login}</h3>
            </div>
            <div>
              <p>{github.bio}</p>
            </div>
            <div className="links_wrapper">
              <div>
              <FontAwesomeIcon icon={faLink}/> 
              <a
                className="links"
                href={`https://${github.blog}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {github.blog}
              </a>{" "}
              </div>
              <div>
              <FontAwesomeIcon icon={faTwitter}/>
              <a
                className="links"
                href={`https://twitter.com/${github.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{github.twitter_username}
              </a>
              </div>
              <div>
              <FontAwesomeIcon icon={faLocationDot}/> <span style={{marginLeft:'2%'}}>{github.location}</span>
              </div>
            </div>
          </section>
          <Pagination repos={repos} repoName={repoName}/>
        </div>
      )}
    </div>
  );
}
export default Home;
