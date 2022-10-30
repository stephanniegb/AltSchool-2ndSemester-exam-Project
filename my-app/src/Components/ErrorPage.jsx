import React from 'react'

function ErrorPage() {
    throw new Error()
  return (
    <div>ErrorPage</div>
  )
}

export default ErrorPage