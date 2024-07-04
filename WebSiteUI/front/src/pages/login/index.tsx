import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

export default function Home() {
const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      senha,
    };

    try {
      const response = await fetch("http://localhost/newsletter/inscricao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao logar");
      }

      const loginResult = await response.json();

      if (loginResult) {
        router.push("/dashboard");
        toast.success("Login realizado com sucesso!");
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="h-full w-full min-h-screen">
      <div className="relative overflow-hidden justify-center items-center bg-gradient-to-tr from-blue-800 to-green-500 i justify-around items-center algin-center">
        <div className="absolute z-0 -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute z-0 -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute z-0 -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute z-0 -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col w-full md:w-1/2  justify-center items-center bg-white min-h-screen">
            <form className="bg-white w-3/5 z-10" onSubmit={handleSubmit}>
              <p className="text-lg text-center font-normal text-gray-600 mb-1">
                Que bom ter você de volta!
              </p>
              <h1 className="text-gray-800 text-center font-bold text-4xl mb-8">
                Insira suas credenciais
              </h1>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none text-black"
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="z-10 block w-full transition bg-green-500 hover:bg-green-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Login
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
