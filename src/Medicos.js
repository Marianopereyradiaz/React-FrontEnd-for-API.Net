import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import Tabla from './components/Tabla';
import ModalEditar from './components/ModalOpciones';

const Medicos = () => {
//api entity
  const url = "https://localhost:44379/api/Medicos/";
  const urlEspecialidades = "https://localhost:44379/api/Especialidades/";
  const urlTitulos = "https://localhost:44379/api/Titulos";
//api a mano
  /*const url = "https://localhost:44330/api/Medicos/";
  const urlEspecialidades = "https://localhost:44330/api/Especialidades/";
  const urlTitulos = "https://localhost:44330/api/Titulos/";*/

  const [data, setData] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const [encontrado, setEncontrado] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [id,setId] = useState(0);

  const Get = (async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json.$values);
  })

  const getEspecialidades = async () => {
    const response = await fetch(urlEspecialidades);
    const json = await response.json();
    setEspecialidades(json.$values);
  }

  const getTitulos = async () => {
    const response = await fetch(urlTitulos);
    const json = await response.json();
    setTitulos(json.$values);
  }

  const openCloseModalInsert = (id) => {
    if (id){
      setId(id);
    } 
    else{
      setId(0);
    }
    setModalInsert(!modalInsert);  
  }

  useEffect(() => {
    Get();
    getEspecialidades();
    getTitulos();
  }, [] ) 

  return (
    <div className="App">
      <div className="container">
      <br></br>
        <div className="row">
          <div className="col">
            <button className="btn btn-success" onClick={()=>openCloseModalInsert(0)}>Agregar</button>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col">
              {Tabla(data,url,setEncontrado,openCloseModalInsert,setId,Get,especialidades,titulos)}
              {ModalEditar(data,setData,modalInsert,encontrado,id,url,openCloseModalInsert,Get,especialidades,titulos)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medicos;