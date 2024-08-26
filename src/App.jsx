import React from 'react';
import AppRoutes from './router/AppRoutes';
import { ProjectProvider } from './contexts/ProjectContext';

const App = () => {
  return (
    <ProjectProvider>
      <div className="flex w-full h-full">
        <AppRoutes />
      </div>
    </ProjectProvider>
  );
};

export default App;
