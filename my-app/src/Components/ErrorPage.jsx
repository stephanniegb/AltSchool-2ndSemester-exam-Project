import React from 'react'
import {Helmet} from 'react-helmet-async'

function ErrorPage() {
    throw new Error()
  return (
    <div>
      <Helmet>
      <title>Repositories</title>
        <meta
        name="description"
        content="error page "
         />
         <link rel="canonical" href="/error" />
      </Helmet>
      ErrorPage</div>
  )
}

export default ErrorPage