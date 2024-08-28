"use client";
import { signup, signin, signInWithProvider } from "./actions";
import { useState } from "react";

export default function LoginPage() {
  const [newUser, setNewUser] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm items-center bg-white p-8 rounded-lg shadow-md space-y-4">
        <form className="mt-4">
          <div className="flex justify-center mt-4">
            <button
              formAction={() => signInWithProvider("google")}
              className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-4"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              <span>Continuar con Google</span>
            </button>
          </div>
        </form>

        <form className="mt-4">
          <div className="flex justify-center mt-4">
            <button
              formAction={() => signInWithProvider("facebook")}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-4"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91V127.5c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S257.12 0 225.36 0c-73.14 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.17V288z"
                ></path>
              </svg>
              <span>Continuar con Facebook</span>
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">también puedes</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        {newUser ? (
          <form className="">
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-green-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border border-grey-100 focus:border-green-700 p-2 mt-1 w-full rounded focus:outline-none focus:ring-0"
                  id="inline-full-name"
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-green-700"
                  htmlFor="inline-password"
                >
                  Contraseña
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border border-grey-100 focus:border-green-700 p-2 mt-1 w-full rounded focus:outline-none focus:ring-0"
                  id="inline-password"
                  type="password"
                  name="password"
                  placeholder="******************"
                  required
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-green-700"
                  htmlFor="inline-password"
                >
                  Repite tu contraseña
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border border-grey-100 focus:border-green-700 p-2 mt-1 w-full rounded focus:outline-none focus:ring-0"
                  id="inline-password"
                  type="password"
                  name="re-password"
                  placeholder="******************"
                  required
                />
              </div>
            </div>
            {/* TODO: captcha here */}
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="bg-green-700 text-white w-full py-2 rounded hover:bg-white hover:text-green-700 border hover:border-green-700"
                  formAction={signup}
                >
                  Registrarse
                </button>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="bg-white text-green-700 w-full py-2 rounded hover:bg-green-700 hover:text-white border hover:border-green-700"
                  onClick={() => setNewUser(false)}
                  type="button"
                >
                  Ya tengo una cuenta
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form className="">
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-green-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border border-grey-100 focus:border-green-700 p-2 mt-1 w-full rounded focus:outline-none focus:ring-0"
                  id="inline-full-name"
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-green-700"
                  htmlFor="inline-password"
                >
                  Contraseña
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border border-grey-100 focus:border-green-700 p-2 mt-1 w-full rounded focus:outline-none focus:ring-0"
                  id="inline-password"
                  type="password"
                  name="password"
                  placeholder="******************"
                  required
                />
              </div>
            </div>
            {/* TODO: captcha here */}
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="bg-green-700 text-white w-full py-2 rounded hover:bg-white hover:text-green-700 border hover:border-green-700"
                  formAction={signin}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="bg-white text-green-700 w-full py-2 rounded hover:bg-green-700 hover:text-white border hover:border-green-700"
                  onClick={() => setNewUser(true)}
                  type="button"
                >
                  Aún no tengo cuenta
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
