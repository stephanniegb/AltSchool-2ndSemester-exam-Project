import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/home.css";
import Loader from "./Loader";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'

function Home() {
  const [github, setGithub] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const {repoName} = useParams()
  let pages = [];

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let currentPosts = repos.slice(firstPostIndex, lastPostIndex);
  const totalPost = repos.length;
  for (let i = 1; Math.ceil(i <= totalPost / postPerPage); i++) {
    pages.push(i);
  }

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
  const handlePrev = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage === Math.floor(totalPost / postPerPage)) {
      setCurrentPage(Math.floor(totalPost / postPerPage));
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div >
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
            <FontAwesomeIcon icon={faLink}/> 
              <a
                className="links"
                href={`https://${github.blog}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {github.blog}
              </a>{" "}
              <br />
              <a
                className="links"
                href={`https://twitter.com/${github.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{github.twitter_username}
              </a>
              <div>
              <FontAwesomeIcon icon={faLocationDot}/> <span>{github.location}</span>
              </div>
            </div>
          </section>
          <section className="repo_wrapper">
            {currentPosts.map((gitRepo) => {
              const { html_url, name, id, ...rest } = gitRepo;
              return (
                <>
                  <Link key={name} to={`repos/${name}`} className="repoLinks">
                    <>
                      <h2>{name} <span>&#8600;</span></h2>
                    </>
                  </Link>
                    {name == repoName ? <Outlet context={[repos, repoName]} /> : ''}
                </>
              );
            })}
            <div className="page_btns_div">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1 ? true : false}
              >
                <span>&#171;</span> Prev
              </button>
              {pages.map((page, index) => {
                return (
                  <button
                    className={page === currentPage ? "page_btn_active" : ""}
                    key={index}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={handleNext}
                disabled={
                  currentPage === Math.floor(totalPost / postPerPage)
                    ? true
                    : false
                }
              >
                Next <span>&#187;</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Home;
