import {Component} from 'react'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-title-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-description-heading">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </div>
      </>
    )
  }
}

export default Home
