import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import Layout from "../componentes/Layout";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

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

export default function NuevoProducto() {
  const router = useRouter();

  // Mutation de apollo
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      // Reescribimos el cache (el cacho nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });

  // Formulario para nuevos productos
  const formik = useFormik({
    initialValues: {
      nombre: "",
      existencia: "",
      precio: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del producto es obligatorio."),
      existencia: Yup.number()
        .required("Agrega la cantidad disponible.")
        .positive("No se aceptan números negativos.")
        .integer("La existencia deben ser números enteros."),
      precio: Yup.number()
        .required("Agrega la cantidad disponible.")
        .positive("No se aceptan números negativos."),
    }),
    onSubmit: async ({ nombre, existencia, precio }) => {
      try {
        await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia,
              precio,
            },
          },
        });

        // Mostrar una alerta
        Swal.fire("Creado", "Se creó el producto correctamente", "success");

        // Redireccionar hacía los productos
        router.push("/productos");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
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
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.existencia && formik.errors.existencia && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
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
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            )}
            <input
              type="submit"
              value="Agregar nuevo producto"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
