import { useEffect, useState } from "react";
import Select from "react-select";

import Layout from "../componentes/Layout";

const options = [
  { id: "chocolate", nombre: "Chocolate" },
  { id: "strawberry", nombre: "Strawberry" },
  { id: "vanilla", nombre: "Vanilla" },
];

export default function NuevoPedido() {
  const [sabores, setSabores] = useState([]);
  useEffect(() => {
    console.log(sabores);
  }, [sabores]);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <Select
        options={options}
        isMulti={true}
        onChange={(sabores) => setSabores(sabores)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.nombre}
        placeholder="Seleccione el sabor"
        noOptionsMessage={() => "No hay resultados"}
      />
    </Layout>
  );
}
