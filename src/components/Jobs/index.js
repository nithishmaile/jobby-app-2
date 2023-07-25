import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsDetails from '../JobsDetails'

import './index.css'

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
    employmentType: [],
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
    const {employmentType} = this.state
    const inputNotInList = employmentType.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobsDetails,
      )
    } else {
      const filteredData = employmentType.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({employmentType: filteredData}, this.getJobsDetails)
    }
  }

  onClickJobsRetry = () => {
    this.getJobsDetails()
  }

  onClickProfileRetry = () => {
    this.getProfile()
  }

  getJobsDetails = async () => {
    const {salaryRange, searchInput, employmentType} = this.state
    this.setState({jobsApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
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
    const jwtToken = Cookies.get('jwt_token')
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

  noJobsContainer = () => (
    <u1 className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters
      </p>
    </u1>
  )

  jobDetails = () => {
    const {jobsDetails} = this.state
    return (
      <ul className="unordered-jobs-details">
        {jobsDetails.map(eachObj => (
          <JobsDetails jobsDetailsList={eachObj} key={eachObj.id} />
        ))}
      </ul>
    )
  }

  renderJobsDetails = () => {
    const {jobsDetails} = this.state
    if (jobsDetails.length === 0) {
      return this.noJobsContainer()
    }
    return this.jobDetails()
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
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! SomeThing Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="find-jobs-button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {profileStatus, jobsApiStatus} = this.state

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
              <ul className="unordered-list">
                {employmentTypesList.map(eachType => (
                  <li
                    className="type-of-employment-list"
                    key={eachType.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={eachType.employmentTypeId}
                      onChange={this.onChangeCheckBox}
                    />
                    <label
                      htmlFor={eachType.employmentTypeId}
                      className="employment-type"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr />
              <h1 className="employment-main-type-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachType => (
                  <li key={eachType.label}>
                    <input
                      type="radio"
                      id={eachType.salaryRangeId}
                      value={eachType.salaryRangeId}
                      name="option"
                      onChange={this.onChangeRadio}
                    />
                    <label
                      htmlFor={eachType.salaryRangeId}
                      className="employment-type"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>{renderJobsDetailsView()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
