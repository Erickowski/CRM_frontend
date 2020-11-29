import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const Cliente = ({ cliente: { nombre, apellido, empresa, email, id } }) => {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE);

  // Eliminar un cliente
  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Está cliente no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminalo!",
      cancelButtonText: "No, cancelar.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });
          Swal.fire("¡Cliente eliminado!", data.eliminarCliente, "success");
        } catch (error) {}
      }
    });
  };

  return (
    <tr>
      <td className="border px-2 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-2 py-2">{empresa}</td>
      <td className="border px-2 py-2">{email}</td>
      <td className="border px-2 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full rounded text-white text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente(id)}
        >
          Eliminar{" "}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;