import logo from './logo.svg';
import './App.css';
import { BiSearch } from "react-icons/bi";


function App() {
  return (
    <div id="CustomApp">
      <nav>
        <a className="navbar-brand" href="#">Show Finder</a>
      </nav>
      <main role="main" className="container">
        <div className="jumbotron">
          <div className="row form-label-group">
            <div className="col-md-6 offset-md-3">
              <BiSearch className="search-icon-custom"/>
              <input className="form-control search-input-custom" placeholder="search show titles"></input>
            </div>
            <div className="col-md-2">
              <button type="button" className="form-control search-custom-btn">Search</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload TEST TEXT.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
