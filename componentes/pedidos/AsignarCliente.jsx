import React, { useEffect, useState } from "react";
import Select from "react-select";

const clientes = [
  { id: 1, nombre: "Erick" },
  { id: 2, nombre: "Daniel" },
  { id: 3, nombre: "Perez" },
];
const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  return (
    <Select
      options={clientes}
      isMulti={true}
      onChange={(cliente) => setCliente(cliente)}
      getOptionValue={(clientes) => clientes.id}
      getOptionLabel={(clientes) => clientes.nombre}
      placeholder="Busque o seleccione el cliente"
      noOptionsMessage={() => "No hay resultados"}
    />
  );
};

export default AsignarCliente;
