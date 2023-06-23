import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiUrl = 'https://apis.ccbp.in/popular-repos'

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    repositoriesData: [],
    selectedLanguageFilter: 'ALL',
  }

  componentDidMount() {
    this.getPopularRepos(languageFiltersData[0].id)
  }

  setRepositories = (fetchedData, loadingStatus) => {
    this.setState({
      isLoading: loadingStatus,
      repositoriesData: fetchedData,
    })
  }

  setIsLoading = loadingStatus => {
    this.setState({
      isLoading: loadingStatus,
    })
  }

  getPopularRepos = async selectedLanguageFilter => {
    this.setIsLoading(true)

    const response = await fetch(`${apiUrl}?language=${selectedLanguageFilter}`)
    console.log(response)
    const fetchedData = await response.json()
    const updatedData = fetchedData.popular_repos.map(repo => ({
      id: repo.id,
      imageUrl: repo.avatar_url,
      name: repo.name,
      starsCount: repo.stars_count,
      forksCount: repo.forks_count,
      issuesCount: repo.issues_count,
    }))
    this.setRepositories(updatedData, false)
  }

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-cards-list-container">
        {repositoriesData.map(each => (
          <RepositoryItem key={each.id} repositoryData={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  setSelectedLanguage = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId})
    this.getPopularRepos(newFilterId)
  }

  renderLanguageFilteredList = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="filter-list-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            isSelected={eachItem.id === selectedLanguageFilter}
            key={eachItem.id}
            languageFilter={eachItem}
            setSelectedLanguage={this.setSelectedLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="github-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFilteredList()}
        {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
      </div>
    )
  }
}

export default GithubPopularRepos
