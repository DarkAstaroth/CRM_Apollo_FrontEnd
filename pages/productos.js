import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Producto from "../components/Producto";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Productos = () => {
  // consultar los productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return "Cargando ...";

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <table className="tabla-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-3">Eliminar</th>
              <th className="w-1/5 py-3">Editar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data
              ? data.obtenerProductos.map((producto) => (
                  <Producto key={producto.id} producto={producto} />
                ))
              : null}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Productos;
