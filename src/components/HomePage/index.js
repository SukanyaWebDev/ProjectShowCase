import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TabItem from '../TabItem/index'
import './index.css'
// import {response} from 'msw'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class HomePage extends Component {
  state = {
    userOption: categoriesList[0].id,
    List: [],
    isLoading: true,
    isSuccess: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    // console.log('hihihih')
    const {userOption} = this.state
    const data = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${userOption}sdsdsdsd`,
    )

    if (data.ok === true) {
      const dataJson = await data.json()
      console.log(data)
      const dataOur = dataJson.projects
      const mainData = dataOur.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({List: mainData, isLoading: false, isSuccess: true})
    }
    if (data.status === 404) {
      this.setState({isSuccess: false, isLoading: false})
      console.log('hi')
    }
  }

  getDataInfo = event => {
    this.setState({userOption: event.target.value}, () => {
      this.getData()
    })
    this.setState({isLoading: true})
    // this.getData()
    // console.log(event.target.value)
  }

  getAgain = () => {
    this.getData()
  }

  render() {
    const {userOption, List, isLoading, isSuccess} = this.state
    return (
      <div>
        <nav>
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
          />
        </nav>
        <div>
          {isSuccess ? (
            <div>
              <select onChange={this.getDataInfo} value={userOption}>
                {categoriesList.map(eachItem => (
                  <option value={eachItem.id} key={eachItem.id}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
              <div>
                {isLoading ? (
                  <div data-testid="loader">
                    <Loader
                      type="ThreeDots"
                      height="30"
                      width={50}
                      color="red"
                    />
                  </div>
                ) : (
                  <ul>
                    {List.map(eachItem => (
                      <TabItem eachItem={eachItem} key={eachItem.id} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button type="button" onClick={this.getAgain}>
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default HomePage
