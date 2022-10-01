import DragList from "./components/DragList"
import { DragAndDropProvider } from "./contexts/DragAndDropContext"
import './styles/index.css';

function App() {
  return (
      <div className="container">
        <DragAndDropProvider>
        <DragList />
        </DragAndDropProvider>        
      </div>
  )
}

export default App
