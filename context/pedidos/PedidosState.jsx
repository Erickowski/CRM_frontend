import React, { useReducer } from "react";

import PedidoContext from "./PedidosContext";
import PedidoReducer from "./PedidosReducer";

import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
} from "../../types";

const PedidoState = ({ children }) => {
  // State de pedidos
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  return <PedidoContext.Provider value={{}}>{children}</PedidoContext.Provider>;
};

export default PedidoState;
