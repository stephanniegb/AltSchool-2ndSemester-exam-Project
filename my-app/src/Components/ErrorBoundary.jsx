import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      redirect: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  
  render() {
    if (this.state.redirect) {
      return <Navigate to={"/"} />;
    } else if (this.state.hasError) {
      return (
        <div style={{height:'70vh', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}} >
          <h1>Somthing went wrong!</h1>
          <h3 style={{marginTop:'10%'}}>
            <Link to="/" style={{color:'var(--white)'}}>Click here</Link> to back to the home page or <br/> wait five
            seconds to be redirected.
          </h3>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
