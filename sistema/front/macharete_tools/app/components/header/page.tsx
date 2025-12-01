'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
// Importando ícones para a navegação e ações
import { HomeIcon, CubeIcon, ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Evita erro no SSR e carrega o usuário inicial
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                // Capitaliza a primeira letra do username para exibição (opcional)
                setUsername(storedUser.charAt(0).toUpperCase() + storedUser.slice(1));
            }
        }

        // Listener caso user seja alterado em outra parte da app
        const handler = () => {
            const updatedUser = localStorage.getItem("user");
            if (updatedUser) {
                setUsername(updatedUser.charAt(0).toUpperCase() + updatedUser.slice(1));
            } else {
                setUsername(null);
            }
        };

        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    // Função para limpar o localStorage e redirecionar (melhor prática)
    const handleLogout = () => {
        localStorage.removeItem("user");
        // O redirecionamento para /login deve ser feito após a limpeza, ou deixe o componente pai cuidar (o Link já faz isso)
    };

    return (
        <header className="w-full px-8 py-3 bg-white border-b border-indigo-100 flex items-center justify-between shadow-lg sticky top-0 z-10">
            
            {/* Logo/Título */}
            <Link href="/">
                <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">
                    Inventa Pro
                </h1>
            </Link>

            {/* Navegação Central */}
            <nav>
                <ul className="flex gap-6 font-medium text-gray-700">
                    <li>
                        <Link 
                            href="/" 
                            className="flex items-center gap-2 hover:text-indigo-600 transition duration-150"
                        >
                            <HomeIcon className="w-5 h-5" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/products" 
                            className="flex items-center gap-2 hover:text-indigo-600 transition duration-150"
                        >
                            <CubeIcon className="w-5 h-5" />
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/estoque" 
                            className="flex items-center gap-2 hover:text-indigo-600 transition duration-150"
                        >
                            <ArchiveBoxIcon className="w-5 h-5" />
                            Estoque
                        </Link>
                    </li>
                </ul>
            </nav>
            
            {/* Área do Usuário e Sair */}
            <div className="flex items-center space-x-4">
                
                {/* Ícone e Nome do Usuário */}
                <div className="flex items-center space-x-2 p-2 rounded-full bg-indigo-50/50">
                    {/* Avatar Simples (Ícone) */}
                    <UserCircleIcon className="w-7 h-7 text-indigo-500" />
                    
                    <span className="text-gray-800 font-semibold text-sm">
                        {username ? username : "Usuário"}
                    </span>
                </div>

                {/* Botão de Sair (Estilizado) */}
                <Link
                    href="/login"
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-150 shadow-sm"
                >
                    <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                    Sair
                </Link>
            </div>
        </header>
    );
}