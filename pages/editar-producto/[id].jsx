import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../../componentes/Layout";

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      nombre
      precio
      existencia
    }
  }
`;

export default function EditarProducto() {
  // Obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener el producto
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id,
    },
  });

  if (loading) return "Cargando...";

  const { obtenerProducto } = data;

  // Schema de validación
  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre del producto es obligatorio."),
    existencia: Yup.number()
      .required("Agrega la cantidad disponible.")
      .positive("No se aceptan números negativos.")
      .integer("La existencia deben ser números enteros."),
    precio: Yup.number()
      .required("Agrega la cantidad disponible.")
      .positive("No se aceptan números negativos."),
  });

  const actualizarInfoProducto = async (valores) => {
    console.log(valores);
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={obtenerProducto}
            validationSchema={schemaValidation}
            onSubmit={(valores) => actualizarInfoProducto(valores)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              values,
              errors,
            }) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Nombre producto"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.nombre && errors.nombre && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.nombre}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Cantidad disponible
                    </label>
                    <input
                      id="existencia"
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Cantidad disponible"
                      value={values.existencia}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.existencia && errors.existencia && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.existencia}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      id="precio"
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Precio Producto"
                      value={values.precio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.precio && errors.precio && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.precio}</p>
                    </div>
                  )}
                  <input
                    type="submit"
                    value="Editar producto"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
