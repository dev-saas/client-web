import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV
  },
  enabled: process.env.NODE_ENV === 'production'
})

export default function useRollbar () {
  const logDebug = debug => {
    rollbar.debug(debug)
  }

  const logInfo = info => {
    rollbar.info(info)
  }

  const logWarning = warning => {
    rollbar.warning(warning)
  }

  const logError = error => {
    rollbar.error(error)
  }

  const logCritical = critical => {
    rollbar.critical(critical)
  }

  return {
    logDebug,
    logInfo,
    logWarning,
    logError,
    logCritical
  }
}
