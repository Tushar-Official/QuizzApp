
import './App.css';
import Questions from './Components/Questions';
import Start from './Components/Start';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import {Provider} from 'react-redux'
import {store} from './Redux/Store'
function App() {
 
  return (
    <div className="App">
    <Provider store={store}>
    <Router>
    <Routes>
   

     <Route path="/" element={<Start/>}/>
  
     <Route path="/Questions" element={
      <ErrorBoundary>
      <Questions/>
      </ErrorBoundary>
    }/>
    
     </Routes>
     </Router>
     </Provider>
    </div>
  );
}

export default App;
