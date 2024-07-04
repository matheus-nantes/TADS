import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'; // Importa o useRouter do Next.js

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter(); // Inicializa o useRouter
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [periodicidade, setPeriodicidade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome,
      email,
      senha,
      periodicidade,
    };

    try {
      const response = await fetch("http://localhost/newsletter/inscricao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar");
      }

      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redireciona para a rota '/login'
  };

  return (
    <div className="h-full w-full min-h-screen  md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-green-500 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Relatórios Climáticos
          </h1>
          <p className="text-white mt-1">
            Um conjunto de serviços para te manter informado à respeito das
            informações meteorológicas da sua cidade
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Saiba mais
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex flex-col md:w-1/2 justify-center py-10 items-center bg-white min-h-screen">
        <form className="bg-white w-3/5" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 text-center font-bold text-4xl mb-1">
            Bem-vindo(a)
          </h1>
          <p className="text-sm text-center font-normal text-gray-600 mb-1">
            É muito bom ter você por aqui!
          </p>
          <hr className="m-6"/>
          <h2 className="text-black font-bold text-2xl mb-2">
            Cadastre-se
          </h2>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none text-black"
              type="text"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
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
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 text-black">
            <select
              id="options"
              name="options"
              className="pl-2 outline-none border-none text-black w-full"
              value={periodicidade}
              onChange={(e) => setPeriodicidade(e.target.value)}
            >
              <option value="" disabled>
                Periodicidade
              </option>
              <option value="semanal">Semanal</option>
              <option value="quinzenal">Quinzenal</option>
              <option value="mensal">Mensal</option>
              <option value="semestral">Semestral</option>
            </select>
          </div>
          <button
            type="submit"
            className="block w-full transition bg-blue-700 hover:bg-blue-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Cadastrar
          </button>
        </form>

        <hr className="mt-6 w-full"/>
        <p className="text-md text-center font-normal text-gray-600 mb-1 mt-6 mb-0">
           Já possui cadastro?
          </p>

          <button
            type="button" // Mudança para type="button" para evitar envio de formulário
            className="block w-3/5 transition bg-green-500 hover:bg-green-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={handleLoginRedirect} // Adiciona o evento onClick para redirecionamento
          >
            Efetuar login
          </button>

      </div>
      <ToastContainer />
    </div>
  );
}
