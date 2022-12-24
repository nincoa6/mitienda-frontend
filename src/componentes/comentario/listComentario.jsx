import axios from "axios";
import { useState, useEffect } from "react";

import LogPage from "../home/logPage";
import NavPage from "../home/navPage";

const ListComentario = () => {
  //url ruta del backend
  const url = "https://mitienda-backend-c1nc.onrender.com/";
  //array para almacenar informacion

  //Array para mostrar la informacion de registros
  const [comentarios, setComentarios] = useState([]);

  //funcion para Listar datos del cliente

  const listarComentario = async () => {
    await axios
      .get(url + "comentario")
      .then((res) => setComentarios(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listarComentario();
  }, {});

  /**
   * funcion para guardar datos
   *
   */
  const [_id, setId] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [fecha, setFecha] = useState("");
  const [numero, setNumero] = useState("");

  const guardar = (event) => {
    event.preventDefault();
    if(_id.length==0){
      axios.post(url+"comentario",{
        idCliente,idProducto,calificacion,comentario,fecha,numero,
      })
      .then((res) => limpiar())
      .catch(err => console.log(err));

    }

    else {
      axios.put(url + "comentario", {
        _id,idCliente,idProducto,calificacion,comentario,fecha,numero,
      })
      .then((res) => limpiar())
      .catch(err => console.log(err));
  }
}
  /**
   * limpiar
   */
  const limpiar = () => {
    setIdProducto("");
    setIdProducto("");
    setCalificacion("");
    setComentario("");
    setFecha("");
    setNumero("");
    const btnClose = document.getElementById("btnClose");
    btnClose.click();
    listarComentario();
  };
  /**

     * Eliminar

     */

  const eliminar = (id) => {
    axios
      .delete(url + "cliente/" + id)

      .then()

      .catch((err) => console.log(err));
  };

  /**

 * Editar

 */

  const editar = (data) => {
    setId(data._id);

    setIdCliente(data.idCliente);

    setIdProducto(data.idProducto);

    setComentario(data.comentario);

    setFecha(data.fecha.substring(0, 10));

    setNumero(data.numero);

    setCalificacion(data.calificacion);

    const btnNuevo = document.getElementById("btnNuevo");

    btnNuevo.click();
  };
  /**
   * Buscar
   */
  const buscar =async (nom) =>{
    if (nom.length==0){
      listarComentario()
    }
    else{
    await axios.get(url+"comentario/com/"+nom)
    .then(res => setComentarios(res.data))
    .catch((err) => console.log(err))
  }

}

  return (
    <div>
      <LogPage />
      <NavPage />
      <div class="card m-2">
        <div class="card-header text-bg-info">Gestiòn de comentarios</div>
        <div class="card-body">
          <div className="row">
            <div className="col-5">
              <input
                type="search" onKeyUp={(e)=>buscar(e.target.value)}
                className="form-control"
                placeholder="digite un nombre"
              />
            </div>
            <div className="col-1">
              <button type="button" class="btn btn-outline-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div className="col-6 text-end">
              <button
                type="button"
                id="btnNuevo"
                class="btn btn-outline-primary"
                title="Nuevo"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-address-book"></i>
              </button>
            </div>
          </div>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Fecha</th>
                <th scope="col">Producto</th>
                <th scope="col">Comentario</th>
                <th> opciones</th>
              </tr>
            </thead>

            <tbody>
              {comentarios.map((comentario, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>

                  <td>{comentario.fecha.substring(0, 10)}</td>
                  <td>{comentario.idProducto}</td>
                  <td>{comentario.comentario}</td>
                  
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => editar(comentario)}
                      className="btn btn-outline-warning buttonOpc"
                      title="Editar"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => eliminar(comentario._id)}
                      className="btn btn-outline-danger buttonOpc"
                      title="Eliminar"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*para guardar*/}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Nuevo Comentario
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={guardar}>
                <div className="row">
                  <div class="col mb-1">
                    <label for="recipient-name" class="col-form-label">
                      IdCliente:
                    </label>
                    <input
                      type="text"
                      value={idCliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="col mb-1">
                    <label for="recipient-name" class="col-form-label">
                      IdProducto:
                    </label>
                    <input
                      type="text"
                      value={idProducto}
                      onChange={(e) => setIdProducto(e.target.value)}
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="mb-1">
                  <label for="recipient-name" class="col-form-label">
                    Calificacion:
                  </label>
                  <input
                    type="number"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-1">
                  <label for="recipient-name" class="col-form-label">
                    Comentario:
                  </label>
                  <input
                    type="text"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-1">
                  <label for="recipient-name" class="col-form-label">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-1">
                  <label for="recipient-name" class="col-form-label">
                    Numero:
                  </label>
                  <input
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    class="form-control"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    id="btnClose"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListComentario
