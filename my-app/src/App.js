import './App.css';
import { Routing } from './Components';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons'



function App() {
  return (
    <div className="App">
      <nav>
      <h3>stephaniegb <FontAwesomeIcon icon={faCode}/></h3>
      <Link style={{ color: "white" }} to={"/error"}>
        Error page
      </Link>
      </nav>
     
      <Routing/>
    </div>
  );
}

export default App;
