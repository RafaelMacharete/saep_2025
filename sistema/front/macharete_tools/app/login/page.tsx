'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, LockClosedIcon, FingerPrintIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Novo estado para carregamento

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Usuário ou senha inválidos.");
                return;
            }

            // Sucesso
            localStorage.setItem("user", username);
            localStorage.setItem("userId", data.id); // Armazena o ID do usuário

            // Simula um pequeno delay para a transição
            setTimeout(() => {
                router.push("/"); // Redireciona pós-login
            }, 500);

        } catch (err) {
            setError("Erro de conexão com o servidor. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {/* Card de Login */}
            <div className="w-full max-w-sm bg-white p-10 rounded-xl shadow-2xl border border-gray-100 transform hover:shadow-3xl transition duration-300">

                <div className="text-center mb-8">
                    <FingerPrintIcon className="w-12 h-12 mx-auto text-indigo-600 mb-2"/>
                    <h1 className="text-3xl font-extrabold text-indigo-700">
                        Inventa Pro
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Acesso ao Painel de Controle</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Campo Usuário */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Usuário</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="Seu nome de usuário"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Senha</label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="Sua senha secreta"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Mensagem de Erro */}
                    {error && (
                        <p className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-md">
                            {error}
                        </p>
                    )}

                    {/* Botão de Entrar */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 uppercase tracking-wider disabled:bg-indigo-300 flex items-center justify-center gap-2"
                        disabled={isLoading || !username || !password}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-xs mt-8">
                    © {new Date().getFullYear()} Inventa Pro | Gestão de Estoque
                </p>
            </div>
        </div>
    );
}