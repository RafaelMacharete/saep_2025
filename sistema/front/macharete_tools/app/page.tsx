"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header/page"; // Certifique-se de que este caminho está correto
import { CheckCircleIcon, CubeIcon, UsersIcon } from "@heroicons/react/24/solid"; // Ícones para os benefícios

export default function HomePage() {
  const router = useRouter();

  // Lógica de Redirecionamento Mantida
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    } else {
      // Se o usuário estiver logado, redireciona para a raiz (que será a dashboard após o login)
      router.replace("/");
    }
  }, []);

  // Use as classes 'sky' para manter a paleta azul
  return (
    // Fundo Leve
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* Header */}
      <Header />
        
      {/* HERO SECTION - Mais espaçoso e com CTA */}
      <section className="flex-1 flex items-center justify-center text-center px-6 py-28 md:py-36">
        <div className="max-w-4xl space-y-8">
          
          {/* Título com destaque */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-sky-800 leading-tight tracking-tight">
            Inventa Pro: <br />
            <span className="text-sky-600">Gestão de Inventário</span> Descomplicada.
          </h1>

          <p className="mt-4 text-gray-700 text-xl md:text-2xl font-light leading-snug">
            A solução definitiva para **monitorar seu estoque em tempo real**, otimizar
            processos operacionais e garantir o controle total da sua empresa.
          </p>
          
          {/* CTA Principal - Botão com sombra */}
          <div className="pt-4">
            <Link 
              href="/login" 
              className="inline-block px-12 py-4 text-lg font-bold text-white bg-sky-600 rounded-full shadow-lg shadow-sky-300 hover:bg-sky-700 transition duration-300 transform hover:scale-[1.02]"
            >
              Comece Agora
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS SECTION - Com cards de destaque e ícones */}
      <section className="bg-white py-20 px-6 border-t border-sky-100">
        <div className="max-w-6xl mx-auto">
          {/* Título da Seção */}
          <h2 className="text-3xl font-bold text-sky-800 text-center mb-16">
            Por que escolher o Inventa Pro?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CARD 1: Inventário em Tempo Real */}
            <div className="bg-white p-8 rounded-2xl border border-sky-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <CubeIcon className="w-10 h-10 text-sky-600 mb-4" />
              <h3 className="font-extrabold text-sky-700 text-xl">Inventário em Tempo Real</h3>
              <p className="mt-3 text-gray-600 text-base">
                Monitore o estoque com precisão. Receba alertas de mínimo e atualize saldos com segurança em poucos cliques, evitando rupturas e excessos.
              </p>
            </div>

            {/* CARD 2: Experiência do Usuário */}
            <div className="bg-white p-8 rounded-2xl border border-sky-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <UsersIcon className="w-10 h-10 text-sky-600 mb-4" />
              <h3 className="font-extrabold text-sky-700 text-xl">Experiência do Usuário</h3>
              <p className="mt-3 text-gray-600 text-base">
                Design limpo e focado em usabilidade. Garanta que toda a sua equipe domine a plataforma rapidamente com uma curva de aprendizado mínima.
              </p>
            </div>

            {/* CARD 3: Otimização Operacional */}
            <div className="bg-white p-8 rounded-2xl border border-sky-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <CheckCircleIcon className="w-10 h-10 text-sky-600 mb-4" />
              <h3 className="font-extrabold text-sky-700 text-xl">Otimização Operacional</h3>
              <p className="mt-3 text-gray-600 text-base">
                Reduza erros manuais e acelere processos de cadastro e organização. Maximize a produtividade diária e foque no que realmente importa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTO - Mais clean e centralizado */}
      <section className="py-20 px-6 bg-sky-50">
        <div className="max-w-2xl mx-auto text-center border-l-4 border-sky-400 pl-4">
          <p className="text-gray-800 text-xl italic leading-relaxed">
            “O **Inventa Pro** transformou nossa gestão. O controle de inventário ficou muito mais simples e seguro. 
            É a ferramenta ideal para quem busca eficiência e uma plataforma que realmente funciona.”
          </p>
          <p className="mt-6 text-sky-700 font-bold text-lg">— Equipe de Logística e Estoque, AgroTech.</p>
        </div>
      </section>

      {/* CALL TO ACTION FINAL - Banner de Destaque */}
      <section className="py-16 bg-sky-700 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">
            Pronto para ter controle total do seu inventário?
          </h3>
          <p className="mt-4 text-sky-100 text-lg">
            Junte-se a centenas de empresas que já transformaram a forma como gerenciam seu estoque.
          </p>
          
          {/* CTA Secundário */}
          <div className="mt-8">
            <Link 
              href="/login" 
              className="inline-block px-10 py-3 text-lg font-bold text-sky-700 bg-white rounded-full shadow-lg hover:bg-sky-50 transition duration-300"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </section>
      
      {/* FOOTER Simples */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-sky-100 bg-white">
        &copy; {new Date().getFullYear()} Inventa Pro. Todos os direitos reservados.
      </footer>
    </div>
  );
}