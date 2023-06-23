// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props

  return (
    <li className="repository-card-item-container">
      <img
        src={repositoryData.imageUrl}
        alt={repositoryData.name}
        className="card-item-image"
      />
      <h1 className="card-item-name">{repositoryData.name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stats-icon"
        />
        <p className="stats-text">{repositoryData.starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stats-icon"
        />
        <p className="stats-text">{repositoryData.forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stats-icon"
        />
        <p className="stats-text">{repositoryData.forksCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
