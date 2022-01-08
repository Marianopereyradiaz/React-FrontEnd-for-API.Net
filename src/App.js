import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Inicio from './Inicio';
import Medicos from './Medicos';


function App() {
   
  return (
    <div className="App">
        <BrowserRouter>
            <Nav/>
                <main>
                    <Routes>
                        <Route path="/" element={<Inicio/>} />
                        <Route path="/medicos" element={<Medicos/>} />
                    </Routes>
                </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
