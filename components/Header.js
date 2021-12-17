import React from "react";
import { useQuery, gql } from "@apollo/client";

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
  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log(data);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;
  const { nombre, apellido } = data.obtenerUsuario;

  return (
    <>
      <div className="flex justify-between mb-6">
        <p>
          Hola: {nombre} {apellido}
        </p>
        <button>Cerrar Sesion</button>
      </div>
    </>
  );
};

export default Header;
