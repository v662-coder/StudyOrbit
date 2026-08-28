import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index';
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import { reportClientError } from './utils/errorLogger'

// BUGFIX (Logging & Monitoring, frontend): previously there was zero
// visibility into client-side crashes beyond the browser console - errors
// like the reported "Uncaught SyntaxError" in authSlice.js were invisible on
// the server. These two listeners catch (a) any uncaught JS error anywhere
// in the app after boot, and (b) any unhandled Promise rejection (e.g. an
// API call whose .catch was missed), and report them to the backend logger.
// (Crashes happening *during initial module evaluation*, before this code
// even runs, are additionally caught by the inline script in index.html -
// see that file for why a separate, earlier hook is needed for that case.)
window.addEventListener('error', (event) => {
  reportClientError({
    type: 'window-onerror',
    message: event.message,
    stack: event.error?.stack,
    source: event.filename,
    line: event.lineno,
    column: event.colno,
  })
})

window.addEventListener('unhandledrejection', (event) => {
  reportClientError({
    type: 'unhandled-promise-rejection',
    message: event.reason?.message || String(event.reason),
    stack: event.reason?.stack,
  })
})

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
)





