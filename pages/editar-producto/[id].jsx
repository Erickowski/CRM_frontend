import { useRouter } from "next/router";
import Layout from "../../componentes/Layout";

export default function EditarProducto() {
  // Obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
    </Layout>
  );
}
