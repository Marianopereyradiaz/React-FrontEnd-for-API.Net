import React, { useState } from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalOpciones = (data,setData,modalInsert,encontrado,id,url,openCloseModalInsert,Get,especialidades,titulos) => {

    let modal;

    const [valueSelected, setValues] = useState({
        id_medico: id,
        nombre:'',
        apellido:'',
        emails: [{
                id_Email: 0,
                mail: '',
              }],
        telefonos: [{
                id_telefono: 0,
                num_telefono: '',
              }],
        domicilios: [{
                id_domicilio: 0,
                nombre_domicilio: '',
                num_consultorio: 0,
        }],
        formaciones: [{
                id_Formacion: 0,
                fecha: new Date(),
                lugar: "string",
                id_titulo: 0,
        }],
        especialidades_medico: [{
                id_especialidad_medico: 0,
                id_Especialidad: 0,
        }],
      })

    const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...valueSelected,
      [name]: value
        });
    } 

    const handleEmailsChange = e => {
        e.preventDefault();
        let email = {
            id_Email: 0,
            mail : e.target.value
        }
        setValues({
            ...valueSelected, emails : [email]
        })
    }

    const handleAddEmailsChange = e => {
      e.preventDefault();
      let email = {
          id_Email: 0,
          mail : e.target.value
      }
      let prevValues = valueSelected.emails[0];
      let newArray = [];
      newArray.push(prevValues,email);
      console.log(newArray);
      setValues({
          ...valueSelected , emails : newArray
      })
    }

    const handleTelefonosChange = e => {
        e.preventDefault();
        let telefono = {
            id_telefono: 0,
            num_telefono: e.target.value
        }
        setValues({
            ...valueSelected, telefonos: [telefono]
        })
    }

    const handleAddTelefonosChange = e => {
        e.preventDefault();
        let telefono = {
          id_telefono: 0,
          num_telefono: e.target.value
      }
        let prevValues = valueSelected.telefonos[0];
        let newArray = [];
        newArray.push(prevValues,telefono);
        console.log(newArray);
        setValues({
            ...valueSelected , telefonos : newArray
        })
    }

    const handleNombreDomiciliosChange = e => {
        e.preventDefault();
        let prevNumConsultorio = valueSelected.domicilios[0].num_consultorio;
        let domicilio = {
            id_domicilio: 0,
            nombre_domicilio: e.target.value,
            num_consultorio: prevNumConsultorio
        }
        setValues({
            ...valueSelected, domicilios: [domicilio]
        })
    }

    const handleNumConsultoriosChange = e => {
        e.preventDefault();
        let prevNombreDomicilio = valueSelected.domicilios[0].nombre_domicilio;
        let domicilio = {
            id_domicilio: 0,
            nombre_domicilio: prevNombreDomicilio,
            num_consultorio: e.target.value
        }
        setValues({
            ...valueSelected, domicilios: [domicilio]
        })
    }

    const handleEspecialidades_MedicoChange = e => {
        e.preventDefault();
        let especialidad_medico = {
            id_especialidad_medico: 0,
            id_Especialidad: e.target.value,
        }
        setValues({
            ...valueSelected, especialidades_medico: [especialidad_medico]
        })
    }

    const handleAddEspecialidades_MedicoChange = e => {
      e.preventDefault();
      let especialidad_medico = {
        id_especialidad_medico: 0,
        id_Especialidad: e.target.value,
      }
      let prevValues = valueSelected.especialidades_medico[0];
      let newArray = [];
      newArray.push(prevValues,especialidad_medico);
      console.log(newArray);
      setValues({
          ...valueSelected , especialidades_medico : newArray
      })
    }

    const handleFormacionesChange = e => {
        let formacion;
        let prevIdTitulo = valueSelected.formaciones[0].id_titulo;
        let prevLugar = valueSelected.formaciones[0].lugar;
        let prevFecha = valueSelected.formaciones[0].fecha;
        const { name, value } = e.target;
        if(name==="id_titulo"){
        formacion = {
                id_formacion: 0,
                [name]: value,
                lugar: prevLugar,
                fecha: prevFecha
            }
        }
        else{
            if(name==="lugar"){
            formacion = {
                id_formacion: 0,
                id_titulo: prevIdTitulo,
                [name]: value,
                fecha: prevFecha
                }
            }else{
            formacion = {
                id_formacion: 0,
                id_titulo: prevIdTitulo,
                lugar: prevLugar,
                [name]: new Date(value),
                }
            }
        }
        setValues({
            ...valueSelected, formaciones: [formacion]
        })
    }
    
    const Post = async () =>{
      const options = { 
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify ( 
          valueSelected
          )
      };
      const response = await fetch(url, options);
      const json = await response.json();
      setData(data.concat(json));
      openCloseModalInsert();
    } 

    const Update = async (id) =>{
      const options = { 
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify (
          encontrado
          )
      };
      await fetch(url+id, options);
      //const json = await response.json();
      //setData(...data,json);
      openCloseModalInsert();
      Get();
    } 

    const mostrarFecha = (fecha) => {
      const nuevaFecha = new Date(fecha);
      return nuevaFecha.toLocaleDateString()
    }

    if (id===0){
      modal = ( <Modal isOpen={modalInsert}>
        <ModalHeader> Agregar Medico </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <br />
            <label>Apellido: </label>
            <br />
            <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
            <br />
            <label>Email 1: </label>
            <br />
            <input type="text" className="form-control" onChange={handleEmailsChange} />
            <br />
            <label>Email 2: </label>
            <br />
            <input type="text" className="form-control" onChange={handleAddEmailsChange} />
            <br />
            <label>Telefono 1: </label>
            <br />
            <input type="text" className="form-control" onChange={handleTelefonosChange}/>
            <br />
            <label>Telefono 2: </label>
            <br />
            <input type="text" className="form-control" onChange={handleAddTelefonosChange}/>
            <br />
            <label>Domicilio de Atención: </label>
            <br />
            <label>Dirección: </label>
            <input type="text" className="form-control" name="nombre_domicilio" onChange={handleNombreDomiciliosChange}/>
            <label>Numero de Consultorio: </label>
            <input type="number" className="form-control" name="num_consultorio" onChange={handleNumConsultoriosChange}/>
            <br />
            <label>Especialidad 1: </label>
            <br />
              <select onChange={handleEspecialidades_MedicoChange} >
              {especialidades.map(obj=> (
                  <option value={obj.id_especialidad}>{obj.nombre_especialidad}</option>
                  ))}
              </select>
            <br />
            <label>Especialidad 2: </label>
            <br />
              <select onChange={handleAddEspecialidades_MedicoChange} >
              {especialidades.map(obj=> (
                  <option value={obj.id_especialidad}>{obj.nombre_especialidad}</option>
                  ))}
              </select>
            <br />
            <br />
            <label>Formacion: </label>
            <br />
            <label>Titulo: </label>
            <br />
            <select name="id_titulo" onChange={handleFormacionesChange} >
              {titulos.map(obj=> (
                  <option value={obj.id_Titulo}>{obj.nombre_Titulo}</option>
                  ))}
              </select>
            <br />
            <label>Lugar donde lo obtuvo: </label>
            <br />
            <input type="text" className="form-control" name="lugar" onChange={handleFormacionesChange}/>
            <label>Fecha de Finalización: </label>
            <br />
            <input type="datetime" className="form-control" name="fecha" onChange={handleFormacionesChange} placeholder="AAAA/MM/DD"/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => Post()}>Aceptar</button>{"  "}
          <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
        </Modal> )
      } else {
        modal = ( <Modal isOpen={modalInsert}>
          <ModalHeader> Modificar Medico: {id}</ModalHeader>
          <ModalBody> 
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" placeholder={encontrado.nombre} onChange={e => encontrado.nombre=(e.target.value)}/>
            <br />
            <label>Apellido: </label>
            <br />
            <input type="text" className="form-control" placeholder={encontrado.apellido} onChange={e => encontrado.apellido=(e.target.value)}/>
            <br />
            <label>Email: </label>
            <br />
            {encontrado.emails.$values.map((e,index) => (
              <div>
              <input type="text" className="form-control" placeholder={e.mail} onChange={e => encontrado.emails.$values[index].mail=(e.target.value)} />
              </div>          
            ))}
            <br />
            <label>Telefono: </label>
            <br />
            {encontrado.telefonos.$values.map((t,index)=> ( 
              <div>
              <input type="text" className="form-control" placeholder={t.num_telefono} onChange={e => encontrado.telefonos.$values[index].num_telefono = (e.target.value)} />
              <br />
              </div>
            ))}
            <label>Domicilio de Atención: </label>
            <br />
            {encontrado.domicilios.$values.map((d,index)=> ( 
              <div>
              <input type="text" className="form-control" placeholder={d.nombre_domicilio} onChange={e => encontrado.domicilios.$values[index].nombre_domicilio = (e.target.value)}/>
              <br />
              </div>
            ))}
            <label>Especialidad: </label>
            <br />
            {encontrado.especialidades_medico.$values.map((em,index)=> ( 
            <select className="form-select" onChange={e => encontrado.especialidades_medico.$values[index].id_Especialidad = (e.target.value)} >
              {especialidades.map(obj=> (
                  <option value={obj.id_especialidad}>{obj.nombre_especialidad}</option>
                  ))}
              </select>
            ))}
            <br />
            <label>Formacion: </label>
            {encontrado.formaciones.$values.map((f,index)=> ( 
            <div>
            <label>Titulo: </label>
            <br />
            <select class="form-select" name="id_titulo" onChange={e => encontrado.formaciones.$values[index].id_Titulo = (e.target.value)} >
              {titulos.map(obj=> (
                  <option value={obj.id_Titulo}>{obj.nombre_Titulo}</option>
                  ))}
              </select>
            <br />
            <label>Lugar donde lo obtuvo: </label>
            <br />
            <input type="datetime" className="form-control" placeholder={f.lugar} onChange={e => encontrado.formaciones.$values[index].lugar = (e.target.value)}/>
            <label>Fecha de Finalización: </label>
            <br />
            <input type="text" className="form-control" placeholder={mostrarFecha(f.fecha)} onChange={e => encontrado.formaciones.$values[index].fecha = (new Date(e.target.value))}/>
              <br />
              </div>
            ))}
          </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => Update(id)}>Modificar</button>{"  "}
            <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
          </ModalFooter>
      </Modal>)}

return (
    <div> 
        {modal}
    </div>
    )
}

export default ModalOpciones;