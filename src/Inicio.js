import Diagrama from './assets/diagrama.png'
const Inicio = () => {
    return (
    <div className="container">
        <div className="row">
            <div className="col">
            <h1>Final Práctica Profesional</h1>
            <p>La consigna es la de consumir en un front-end hecho en React una API hecha en ASP.NET
                la cuál deberá estar implementada tanto con Entity Framework cómo tambíen hecha "a mano". La base de datos
                a utilizar será SQL Server Express (Microsoft SQL Server 2019 (RTM) - 15.0.2000.5 (X64)) en Microsoft SQL Server Management Studio 18.
                Por su parte, la versión de Visual Studio utilizada es Visual Studio Community 2019 v 16.8.6 con .Net Core v 5.0.103.
                Además, el proyecto en React requiere Node v-14.16.1.
                <br />
                El Objetivo es hacer un CRUD con al menos 3 tablas relacionadas, en mi caso, el diagrama de la base de datos queda de la siguiente forma:
                <br/>
                <img src={Diagrama} alt="" />
            </p>
            </div>           
        </div>
    </div>
    );
};

export default Inicio;