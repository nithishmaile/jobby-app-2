import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    title,
    location,
    jobDescription,
    employmentType,
    rating,
    id,
    packagePerAnnum,
  } = similarJobsDetails

  return (
    <div className="similar-jobs-job-details-card">
      <div className="similar-jobs-company-rating">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="similar-jobs-company-logo"
        />
        <div>
          <h1 className="similar-jobs-title-heading">{title}</h1>
          <AiFillStar color=" #fbbf24" id="rating" size={20} />
          <label htmlFor="rating" className="similar-jobs-rating">
            {rating}
          </label>
        </div>
      </div>
      <div className="similar-jobs-package-location-type">
        <div>
          <MdLocationOn id="location" size={20} />
          <label htmlFor="location" className="similar-jobs-rating">
            {location}
          </label>
          <BsFillBriefcaseFill htmlFor="jobType" size={20} />
          <label htmlFor="jobType" className="similar-jobs-rating">
            {employmentType}
          </label>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr />
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </div>
  )
}

export default SimilarJobs
