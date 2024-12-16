import { ErrorBoundary } from './components/ErrorBoundary';
import { MainContent } from './components/layout/MainContent';
import { TaskProvider } from './components/area/task/TaskContext';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <MainContent />
      </TaskProvider>
    </ErrorBoundary>
  );
}

export default App;