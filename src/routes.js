import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Users = React.lazy(() => import('./views/users/Users'))
const AiAssistant = React.lazy(() => import('./views/Ai/AiAssistant'))
const Questions = React.lazy(() => import('./views/Questions/Questions'))
const Subscription = React.lazy(() => import('./views/Subscription/Subscription'))
const Organization = React.lazy(() => import('./views/Organization/Organization'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/users', name: 'Users', element: Users },
  { path: '/questions', name: 'Questions Settings', element: Questions },
  { path: '/aiassistant', name: 'Ai Assistant', element: AiAssistant },
  { path: '/subscription', name: 'Subscription', element: Subscription },
  { path: '/organization', name: 'Organization', element: Organization },
]

export default routes
