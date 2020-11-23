import Layout from "../componentes/Layout";

export default function NuevaCuenta() {
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">
        Crear nueva cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
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
                placeholder="Nombre usuario"
              />
            </div>
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
                placeholder="Apellido usuario"
              />
            </div>
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
                placeholder="Email usuario"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                placeholder="Password usuario"
              />
            </div>
            <input
              type="submit"
              value="Crear cuenta"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
