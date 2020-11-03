import React from 'react';
import './App.css';
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import parse from 'html-react-parser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchVal: '', shows: [], seasons: [], selectedShow: null, episodes: [] };

    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.showEpisodes = this.showEpisodes.bind(this);
    this.filterEpisodes = this.filterEpisodes.bind(this);
  }

  searchChange(event) {
    this.setState({ searchVal: event.target.value });
  }

  searchSubmit(event) {
    axios.get(`http://api.tvmaze.com/search/shows?q=` + this.state.searchVal)
      .then(res => {
        this.setState({ shows: res.data });
        this.setState({seasons: []});
        this.setState({selectedShow: null });
        this.setState({episodes: []});
      })
  }

  showEpisodes(event) {
    let id = event.currentTarget.getAttribute("attr-id");
    let index = parseInt(event.currentTarget.getAttribute("attr-index"));
    axios.get(`http://api.tvmaze.com/shows/` + id + `/episodes`)
      .then(res => {
        this.setState({ selectedShow: this.state.shows[index] })
        this.setState({ shows: [] });

        let seasons = [];
        res.data.forEach(episode => {
          if (!seasons.find(x => x.season == episode.season)) {
            seasons.push({ season: episode.season, episodes: [episode] });
          }
          else {
            seasons.find(x => x.season == episode.season).episodes.push(episode);
          }
        });
        this.setState({ seasons: seasons })
      })
  }

  filterEpisodes(event) {
    if (event.currentTarget.value !== "0") {
      let selectedSeason = parseInt(event.currentTarget.value);
      this.setState({ episodes: this.state.seasons.find(x => x.season == selectedSeason).episodes });
    }
  }

  render() {
    return (
      <div id="CustomApp">
        <nav>
          <a className="navbar-brand" href="#">Show Finder</a>
        </nav>
        <main role="main" className="container">
          <div className="jumbotron">
            <div className="row form-label-group">
              <div className="col-md-6 offset-md-3">
                <BiSearch className="search-icon-custom" />
                <input className="form-control search-input-custom" value={this.state.searchVal} placeholder="search show titles" onChange={this.searchChange}></input>
              </div>
              <div className="col-md-2">
                <button type="button" className="form-control search-custom-btn" onClick={this.searchSubmit}>Search</button>
              </div>
            </div>
            <ul className="list-group" id="search-results">
              {
                this.state.shows.map((d, index) => {
                  return (
                    <li className="list-group-item show-item row" key={d.show.id}>
                      <img src={d.show.image.medium} className="img-thumbnail"></img>
                      <div>
                        <span className="show-title">{d.show.name}</span>
                        <span>{parse(d.show.summary)}</span>
                        <button className="form-control episodes-button col-md-3" attr-id={d.show.id} attr-index={index} onClick={this.showEpisodes}>Show Episodes</button>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            {
              this.state.seasons.length > 0 &&
              <div className="row">
                <div className="col-md-3">
                  <img src={this.state.selectedShow.show.image.medium}></img>
                </div>
                <div className="col-md-6">
                  <select name="Seasons" id="Seasons" className="col-md-4 form-control" onChange={this.filterEpisodes}>
                    <option value="0">Select a season</option>
                    {
                      this.state.seasons.map((d, index) => {
                        return <option value={d.season}>Season {d.season}</option>
                      })
                    }
                  </select>
                  <ul className="list-group" id="episodes">
                    {
                      this.state.episodes.map((d, index) => {
                        return (
                          <li key={index}>
                            {
                              d.name
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </main>
      </div>
    );
  }
}
export default App;