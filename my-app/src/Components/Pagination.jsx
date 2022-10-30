import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Pagination({ repos, repoName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  let pages = [];

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let currentPosts = repos.slice(firstPostIndex, lastPostIndex);
  const totalPost = repos.length;
  for (let i = 1; Math.ceil(i <= totalPost / postPerPage); i++) {
    pages.push(i);
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
    <section className="repo_wrapper">
      {currentPosts.map((gitRepo) => {
        const { html_url, name, id, ...rest } = gitRepo;
        return (
          <>
            <Link key={name} to={`repos/${name}`} className="repoLinks">
              <>
                <h2>
                  {name} <span>&#8600;</span>
                </h2>
              </>
            </Link>
            {name == repoName ? <Outlet context={[repos, repoName]} /> : ""}
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
            currentPage === Math.floor(totalPost / postPerPage) ? true : false
          }
        >
          Next <span>&#187;</span>
        </button>
      </div>
    </section>
  );
}

export default Pagination;
