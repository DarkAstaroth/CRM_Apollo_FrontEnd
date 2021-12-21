import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = () => {
  const router = useRouter();

  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  console.log(data);
  console.log(loading);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) {
    return <p>Loading...</p>;
  }
  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  console.log(data);

  return (
    <>
      {data ? (
        <div className="flex justify-between mb-6">
          <p>
            Hola: {nombre} {apellido}
          </p>
          <button
            className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            onClick={() => cerrarSesion()}
          >
            Cerrar Sesion
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Header;