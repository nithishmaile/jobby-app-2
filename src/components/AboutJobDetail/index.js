import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobDetail extends Component {
  state = {aboutJobApiStatus: '', aboutJobDetails: '', similarJobs: ''}

  componentDidMount() {
    this.getAboutJobDetail()
  }

  getAboutJobDetail = async () => {
    this.setState({aboutJobApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updateJobDetail = [data.job_details].map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      jobDescription: eachItem.job_description,
      packagePerAnnum: eachItem.package_per_annum,
      id: eachItem.id,
      title: eachItem.title,
      location: eachItem.location,
      rating: eachItem.rating,
      lifeAtCompany: {
        description: eachItem.life_at_company.description,
        imageUrl: eachItem.life_at_company.image_url,
      },
      skills: eachItem.skills.map(eachObj => ({
        name: eachObj.name,
        imageUrl: eachObj.image_url,
      })),
    }))
    const updateSimilarJobs = data.similar_jobs.map(eachObj => ({
      companyLogoUrl: eachObj.company_logo_url,
      employmentType: eachObj.employment_type,
      jobDescription: eachObj.job_description,
      id: eachObj.id,
      title: eachObj.title,
      location: eachObj.location,
      rating: eachObj.rating,
    }))
    if (response.ok === true) {
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
      title,
      location,
      jobDescription,
      employmentType,
      rating,
      id,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = aboutJobDetails[0]

    /* const updateLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    } */

    /* const updateSkills = {skills}.map(eachObj => ({
      name: eachObj.name,
      imgUrl: eachObj.image_url,
    })) */

    return (
      <div className="about-job-details-card">
        <div className="about-company-rating">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="about-company-logo"
          />
          <div>
            <h1 className="about-title-heading">{title}</h1>
            <AiFillStar color=" #fbbf24" id="rating" size={20} />
            <label htmlFor="rating" className="about-rating">
              {rating}
            </label>
          </div>
        </div>
        <div className="about-package-location-type">
          <div>
            <MdLocationOn id="location" size={20} />
            <label htmlFor="location" className="about-rating">
              {location}
            </label>
            <BsFillBriefcaseFill htmlFor="jobType" size={20} />
            <label htmlFor="jobType" className="about-rating">
              {employmentType}
            </label>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <h1>Life At Company</h1>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-job-detail-container">
          {this.renderAboutJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJobDetail
