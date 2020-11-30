import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={`p-2 ${router.pathname === "/" && "bg-blue-800"}`}>
          <Link href="/">
            <a className="text-white block">Clientes</a>
          </Link>
        </li>
        <li
          className={`p-2 ${router.pathname === "/pedidos" && "bg-blue-800"}`}
        >
          <Link href="/pedidos">
            <a className="text-white block">Pedidos</a>
          </Link>
        </li>
        <li
          className={`p-2 ${router.pathname === "/productos" && "bg-blue-800"}`}
        >
          <Link href="/productos">
            <a className="text-white block">Productos</a>
          </Link>
        </li>
      </nav>
      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Otras opciones</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={`p-2 ${
            router.pathname === "/mejores-vendedores" && "bg-blue-800"
          }`}
        >
          <Link href="/mejores-vendedores">
            <a className="text-white block">Mejores vendedores</a>
          </Link>
        </li>
        <li
          className={`p-2 ${
            router.pathname === "/mejores-clientes" && "bg-blue-800"
          }`}
        >
          <Link href="/mejores-clientes">
            <a className="text-white block">Mejores clientes</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
