import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobDetail extends Component {
  state = {aboutJobApiStatus: '', aboutJobDetails: [], similarJobs: []}

  componentDidMount() {
    this.getAboutJobDetail()
  }

  getAboutJobDetail = async () => {
    this.setState({aboutJobApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedAboutJobDetails = data.job_details
      const updateJobDetail = {
        companyLogoUrl: fetchedAboutJobDetails.company_logo_url,
        companyWebsiteUrl: fetchedAboutJobDetails.company_website_url,
        employmentType: fetchedAboutJobDetails.employment_type,
        jobDescription: fetchedAboutJobDetails.job_description,
        packagePerAnnum: fetchedAboutJobDetails.package_per_annum,
        id: fetchedAboutJobDetails.id,
        title: fetchedAboutJobDetails.title,
        location: fetchedAboutJobDetails.location,
        rating: fetchedAboutJobDetails.rating,
        lifeAtCompany: {
          description: fetchedAboutJobDetails.life_at_company.description,
          imageUrl: fetchedAboutJobDetails.life_at_company.image_url,
        },
        skills: fetchedAboutJobDetails.skills.map(eachObj => ({
          imageUrl: eachObj.image_url,
          name: eachObj.name,
        })),
      }

      const updateSimilarJobs = data.similar_jobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        jobDescription: eachObj.job_description,
        id: eachObj.id,
        title: eachObj.title,
        location: eachObj.location,
        rating: eachObj.rating,
      }))
      this.setState({
        aboutJobApiStatus: apiStatus.success,
        aboutJobDetails: updateJobDetail,
        similarJobs: updateSimilarJobs,
      })
    } else {
      this.setState({aboutJobApiStatus: apiStatus.failure})
    }
  }

  renderAboutJobDetails = () => {
    const {aboutJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      location,
      jobDescription,
      employmentType,
      lifeAtCompany,
      rating,
      skills,
      packagePerAnnum,
    } = aboutJobDetails

    return (
      <div className="about-job-details-card">
        <div className="about-company-rating">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="about-company-logo"
          />
          <div>
            <h1 className="about-title-heading">{title}</h1>
            <div className="image-type-container">
              <AiFillStar color=" #fbbf24" size={20} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="about-package-location-type">
          <div className="about-location-type-container">
            <div className="about-image-type-container">
              <MdLocationOn size={20} />
              <p className="rating">{location}</p>
            </div>
            <div className="image-type-container">
              <BsFillBriefcaseFill size={20} />
              <p className="rating">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-website-url">
          <h1>Description</h1>
          <div>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <BiLinkExternal size={15} />
            </a>
          </div>
        </div>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul className="unordered-list-skills">
          {skills.map(eachItem => (
            <li key={eachItem.name} className="list-skills">
              <img src={eachItem.imageUrl} alt="name" className="skills-icon" />
              <p>{eachItem.name}</p>
            </li>
          ))}
        </ul>
        <div>
          <h1>Life At Company</h1>
          <p>{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life_at_company_image"
          />
        </div>
      </div>
    )
  }

  renderAboutJodLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAboutJobsFailure = () => (
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
        onClick={this.onClickAboutJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  onClickAboutJobsRetry = () => {
    this.getAboutJobDetail()
  }

  render() {
    const {similarJobs} = this.state

    const renderAccToApiStatus = () => {
      const {aboutJobApiStatus} = this.state

      switch (aboutJobApiStatus) {
        case apiStatus.success:
          return this.renderAboutJobDetails()
        case apiStatus.inprogress:
          return this.renderAboutJodLoader()
        case apiStatus.failure:
          return this.renderAboutJobsFailure()
        default:
          return null
      }
    }

    return (
      <>
        <Header />
        <div className="about-job-detail-container">
          {renderAccToApiStatus()}
          <div>
            <h1>Similar Jobs</h1>
            <ul>
              {similarJobs.map(eachItem => (
                <SimilarJobs similarJobsDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default AboutJobDetail
