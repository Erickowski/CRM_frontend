import React from "react";
import Swal from "sweetalert2";

const Producto = ({ producto: { nombre, existencia, precio } }) => {
  // Eliminar un cliente
  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Este producto no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminalo!",
      cancelButtonText: "No, cancelar.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // try {
        //   const { data } = await eliminarCliente({
        //     variables: {
        //       id,
        //     },
        //   });
        // Swal.fire("¡Producto eliminado!", data.eliminarCliente, "success");
        // } catch (error) {
        //   console.log(error);
        // }
      }
    });
  };

  return (
    <tr>
      <td className="border px-2 py-2">{nombre}</td>
      <td className="border px-2 py-2">{existencia} Piezas</td>
      <td className="border px-2 py-2">$ {precio}</td>
      <td className="border px-2 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full rounded text-white text-xs uppercase font-bold"
          onClick={() => confirmarEliminarProducto()}
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
      <td className="border px-2 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full rounded text-white text-xs uppercase font-bold"
          //   onClick={() => editarCliente()}
        >
          Editar{" "}
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Producto;
