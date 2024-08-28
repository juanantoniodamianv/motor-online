"use client";

import { Sidebar } from "flowbite-react";
import { HiLogin } from "react-icons/hi";

export default function SignInButton() {
  return (
    <Sidebar.Item href="/login" icon={HiLogin} className="flex justify-start">
      Iniciar Sesión
    </Sidebar.Item>
  );
}
