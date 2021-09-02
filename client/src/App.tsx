import React from 'react'

// @ts-ignore
const Header = React.lazy(() => import('app1/Header'))
const HeaderFallback = <div>Loading Header...</div>

// @ts-ignore
const Body = React.lazy(() => import('app1/Body'))
const BodyFallback = <div>Loading Body...</div>

function App() {
  return (
    <>
      <React.Suspense fallback={HeaderFallback}>
        <Header />
      </React.Suspense>
      <React.Suspense fallback={BodyFallback}>
        <Body />
      </React.Suspense>
    </>
  )
}

export default App
