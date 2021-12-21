import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Home = () => {
  const router = useRouter();
  // consulta de apollo
  const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);
  console.log(client);

  if (loading) return "...Cargando";

  if (!data.obtenerClientesVendedor) {
    client.clearStore();
    router.push("/login");
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="nuevoCliente">
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            Nuevo Cliente
          </a>
        </Link>
        <table className="tabla-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data
              ? data.obtenerClientesVendedor.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="border px-4 py-2">
                      {cliente.nombre} {cliente.apellido}
                    </td>
                    <td className="border px-4 py-2">{cliente.empresa}</td>
                    <td className="border px-4 py-2">{cliente.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Home;
