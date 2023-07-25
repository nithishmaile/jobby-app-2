import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    title,
    location,
    jobDescription,
    employmentType,
    rating,
  } = similarJobsDetails

  return (
    <li className="similar-jobs-job-details-card">
      <div className="similar-jobs-company-rating">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-company-logo"
        />
        <div>
          <h1 className="similar-jobs-title-heading">{title}</h1>
          <div className="image-type-container">
            <AiFillStar color=" #fbbf24" size={20} />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
