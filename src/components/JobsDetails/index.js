import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsDetails = props => {
  const {jobsDetailsList} = props
  const {
    companyLogoUrl,
    title,
    location,
    jobDescription,
    employmentType,
    rating,
    id,
    packagePerAnnum,
  } = jobsDetailsList

  return (
    <Link to={`jobs/${id}`} className="link">
      <div className="job-details-card">
        <div className="company-rating">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title-heading">{title}</h1>
            <AiFillStar color=" #fbbf24" id="rating" size={20} />
            <label htmlFor="rating" className="rating">
              {rating}
            </label>
          </div>
        </div>
        <div className="package-location-type">
          <div>
            <MdLocationOn id="location" size={20} />
            <label htmlFor="location" className="rating">
              {location}
            </label>
            <BsFillBriefcaseFill htmlFor="jobType" size={20} />
            <label htmlFor="jobType" className="rating">
              {employmentType}
            </label>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobsDetails
