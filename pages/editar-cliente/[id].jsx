import { useRouter } from "next/router";

export default function EditarCliente() {
  // Obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(id);
  return <h1>Desde editar cliente</h1>;
}
