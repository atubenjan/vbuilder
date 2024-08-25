import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Users = React.lazy(() => import('./views/users/Users'))
const AiAssistant = React.lazy(() => import('./views/Ai/AiAssistant'))
const Questions = React.lazy(() => import('./views/Questions/Questions'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/users', name: 'Users', element: Users },
  { path: '/questions', name: 'Questions Settings', element: Questions },
  { path: '/aiassistant', name: 'Ai Assistant', element: AiAssistant },
  { path: '/subscription', name: 'Subscription', element: Users },
  { path: '/organization', name: 'Organization', element: Colors },
]

export default routes
