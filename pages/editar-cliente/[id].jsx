import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import Layout from "../../componentes/Layout";

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      email
      telefono
      empresa
    }
  }
`;

const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      nombre
      email
    }
  }
`;

export default function EditarCliente() {
  // Obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id,
    },
  });

  // Actualizar el cliente
  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  // Schema de validación
  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre del cliente es obligatorio."),
    apellido: Yup.string().required("El apellido del cliente es obligatorio."),
    empresa: Yup.string().required("El campo empresa es obligatorio."),
    email: Yup.string()
      .email("Email no válido.")
      .required("El email del cliente es obligatorio."),
  });

  if (loading) return "Cargando...";

  const { obtenerCliente } = data;

  // Modificar el cliente en la BD
  const actualizarInfoCliente = async ({
    nombre,
    apellido,
    empresa,
    email,
    telefono,
  }) => {
    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      //  Mostrar alerta
      Swal.fire("Actualizado", "El cliente ha sido actualizado.", "success");
      // Redireccionar
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(valores) => {
              actualizarInfoCliente(valores);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              errors,
              touched,
              values,
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
                      placeholder="Nombre cliente"
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
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Apellido cliente"
                      value={values.apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.apellido && errors.apellido && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.apellido}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Empresa cliente"
                      value={values.empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.empresa && errors.empresa && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.empresa}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Email cliente"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{errors.email}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="telefono"
                    >
                      Telefono
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                      placeholder="Telefono cliente"
                      value={values.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Editar cliente"
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
