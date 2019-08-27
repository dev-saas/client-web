import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { withRouter } from 'react-router-dom'

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS)

function GAListener ({ children, history }) {
  useEffect(() => {
    sendPageView(history.location)
    history.listen(sendPageView)
  }, [])

  const sendPageView = location => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }

  return children
}

const gaListener = withRouter(GAListener)

export { gaListener as GAListener }
