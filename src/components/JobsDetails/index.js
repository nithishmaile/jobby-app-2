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
            <div className="image-type-container">
              <AiFillStar color=" #fbbf24" size={20} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-location-type">
          <div className="location-type-container">
            <div className="image-type-container">
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobsDetails
