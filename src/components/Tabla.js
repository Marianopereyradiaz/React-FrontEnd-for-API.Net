import React from "react";

const Tabla = (data,url,setEncontrado,openCloseModalInsert,setId,Get,especialidades,titulos) => {

    const Delete = async (id) =>{
        const options = { 
          method: 'DELETE',
        };
        await fetch(url+id, options);
        setId(0);
        Get();
      } 

    const GetPorId = async (id) => {
    const response = await fetch(url+id);
    const json = await response.json();
    setEncontrado(json);
    openCloseModalInsert(id);
    }

    const mostrarEspecialidad = (id_Especialidad) => {
      const especialidad = especialidades.filter(function(element){
        return element.id_especialidad === id_Especialidad;
      });
      if(typeof especialidad === 'undefined'){
        return '';
      }else{
        if(typeof especialidad[0] === 'undefined')
        return '';
        else{
        return especialidad[0].nombre_especialidad;
        }
      }
    }

    const mostrarFecha = (fecha) => {
      const nuevaFecha = new Date(fecha);
      return nuevaFecha.toLocaleDateString()
    }

    const mostrarTitulo = (id_Titulo) => {
      const titulo=titulos.filter(function(element){
        return element.id_Titulo === id_Titulo;
      });
      if(typeof titulo === 'undefined'){
      return '';
      }else{
        if(typeof titulo[0] === 'undefined')
        return '';
        else{
          return titulo[0].nombre_Titulo;
        }
      } 
    }
    return (
        <table className="table table-bordered" border="2px solid black;">
              <thead>
                <tr>
                  <th className="align-middle" scope="col" rowSpan="2">Nombre</th>
                  <th className="align-middle" scope="col" rowSpan="2">Apellido</th>
                  <th className="align-middle" scope="col" rowSpan="2">Email</th>
                  <th className="align-middle" scope="col" rowSpan="2">Telefono</th>
                  <th scopename="col" colSpan="2">Domicilio</th>
                  <th className="align-middle" scope="col" rowSpan="2">Especialidad</th>
                  <th scopename="col" colSpan="3">Formacion</th>
                </tr>
                <tr>
                  <th scope="col">Dirección</th>
                  <th scope="col">Consultorio</th>
                  <th scopename="col">Titulo</th>
                  <th scopename="col">Lugar</th>
                  <th scopename="col">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {data.map(obj=> (
                  <tr>
                    <td key={"nombre"}>{obj.nombre}</td>
                    <td key={"apellido"}>{obj.apellido}</td>
                    <td>
                      <ul className="list-group">
                        {obj.emails.$values.map(e=> (
                          <li className="list-group-item" key={e.$id}>{e.mail}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                        {obj.telefonos.$values.map(t=> (
                          <li className="list-group-item" key={t.$id}>{t.num_telefono}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                        {obj.domicilios.$values.map(d=> (
                          <li className="list-group-item" key={d.$id}>{d.nombre_domicilio}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                        {obj.domicilios.$values.map(d=> (
                          <li className="list-group-item" key={d.$id}>{d.num_consultorio}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                      {obj.especialidades_medico.$values.map(em => (
                          <li className="list-group-item" key={em.$id}>{mostrarEspecialidad(em.id_Especialidad)}</li>
                      ))}
                      </ul>
                    </td>                  
                    <td>
                      <ul className="list-group">
                        {obj.formaciones.$values.map(f=> (
                          <li className="list-group-item" key={f.$id}>{mostrarTitulo(f.id_titulo)}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                        {obj.formaciones.$values.map(f=> (
                          <li className="list-group-item" key={f.$id}>{f.lugar}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-group">
                        {obj.formaciones.$values.map(f=> (
                          <li className="list-group-item" key={f.$id}>{mostrarFecha(f.fecha)}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button className="btn btn-primary" onClick={() => GetPorId(obj.id_medico)}>Editar</button>
                      <p></p>
                      <button className="btn btn-danger" onClick={() => Delete(obj.id_medico)}>Eliminar</button>
                    </td> 
                  </tr>
                ))}
              </tbody>
        </table>
    );
  }

export default Tabla;

