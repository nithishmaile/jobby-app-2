import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsDetails from '../JobsDetails'

import './index.css'

// ?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}

// employment_type=${employmentType}&

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileStatus: apiStatus.initial,
    profileDetails: {},
    jobsDetails: [],
    jobsApiStatus: apiStatus.initial,
    employmentType: '',
    salaryRange: '',
    searchInput: '',
    searchInputValue: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsDetails()
  }

  onChangeRadio = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsDetails)
  }

  onSearchResults = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInputValue} = this.state
    this.setState({searchInput: searchInputValue}, this.getJobsDetails)
  }

  onChangeCheckBox = event => {
    console.log(event.target.value)
  }

  getJobsDetails = async () => {
    const {salaryRange, searchInput} = this.state
    this.setState({jobsApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('token')
    const url = `https://apis.ccbp.in/jobs?minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const fetchedData = data.jobs
    const updateJobDetails = fetchedData.map(eachObj => ({
      companyLogoUrl: eachObj.company_logo_url,
      employmentType: eachObj.employment_type,
      jobDescription: eachObj.job_description,
      packagePerAnnum: eachObj.package_per_annum,
      id: eachObj.id,
      title: eachObj.title,
      location: eachObj.location,
      rating: eachObj.rating,
    }))
    if (response.ok === true) {
      this.setState({
        jobsApiStatus: apiStatus.success,
        jobsDetails: updateJobDetails,
      })
    } else {
      this.setState({jobsApiStatus: apiStatus.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatus.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        profileStatus: apiStatus.success,
        profileDetails: data.profile_details,
      })
    } else {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  renderJobsDetails = () => {
    const {jobsDetails} = this.state

    return (
      <div>
        {jobsDetails.map(eachObj => (
          <JobsDetails jobsDetailsList={eachObj} key={eachObj.id} />
        ))}
      </div>
    )
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state

    const updatedData = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    return (
      <div className="profile-card-view">
        <img src={updatedData.profileImageUrl} alt="profile" />
        <h1 className="rahul-name">{updatedData.name}</h1>
        <p>{updatedData.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container loader-spinner" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobsFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! SomeThing Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="find-jobs-button">
        Retry
      </button>
    </div>
  )

  render() {
    const {profileStatus, jobsApiStatus, employmentType} = this.state

    const renderJobsDetailsView = () => {
      switch (jobsApiStatus) {
        case apiStatus.success:
          return this.renderJobsDetails()
        case apiStatus.failure:
          return this.renderJobsFailure()
        case apiStatus.inProgress:
          return this.renderLoader()
        default:
          return null
      }
    }

    const renderProfileDetailsView = () => {
      switch (profileStatus) {
        case apiStatus.success:
          return this.renderProfileDetails()
        case apiStatus.failure:
          return this.renderProfileFailure()
        case apiStatus.inProgress:
          return this.renderLoader()
        default:
          return null
      }
    }

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onSearchResults}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className="search-icon" size={20} color="#ffffff" />
            </button>
          </div>
          <div className="profile-details-container">
            {renderProfileDetailsView()}
            <div className="employment-type-container">
              <hr />
              <h1 className="employment-main-type-heading">
                Type of Employment
              </h1>
              {employmentTypesList.map(eachType => (
                <div>
                  <input
                    type="checkbox"
                    id={eachType.label}
                    value={eachType.employmentTypeId}
                    onClick={this.onChangeCheckBox}
                  />
                  <label htmlFor={eachType.label} className="employment-type">
                    {eachType.label}
                  </label>
                </div>
              ))}
              <hr />
              <h1 className="employment-main-type-heading">Salary Range</h1>
              {salaryRangesList.map(eachType => (
                <div>
                  <input
                    type="radio"
                    id={eachType.label}
                    value={eachType.salaryRangeId}
                    name="salaryRange"
                    onChange={this.onChangeRadio}
                  />
                  <label htmlFor={eachType.label} className="employment-type">
                    {eachType.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>{renderJobsDetailsView()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
