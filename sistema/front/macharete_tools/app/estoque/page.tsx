"use client";
import { useEffect, useState } from "react";
import Header from "../components/header/page"; // Certifique-se de que o caminho está correto
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, ArchiveBoxIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// Tipagem para a mensagem de feedback
interface FeedbackMessage {
  text: string;
  type: "success" | "error";
}

export default function StockMovementPage() {
  const [products, setProducts] = useState<any[]>([]); // Tipagem melhorada
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [operationType, setOperationType] = useState("Input");
  const [operationDate, setOperationDate] = useState("");

  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [alertLow, setAlertLow] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Usando 'user' ao invés de 'userId' se o backend espera o username. Se for ID, ajuste a chave.
      setUserId(localStorage.getItem("user"));
    }
  }, []);

  // Carrega produtos em ordem alfabética
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/api/products/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Falha ao buscar produtos");

        const data = await res.json();
        // Ordena por nome antes de setar
        const sortedProducts = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setMessage({ text: "Erro ao carregar a lista de produtos.", type: "error" });
      }
    }
    fetchProducts();
  }, []);

  async function registerMovement() {
    setMessage(null);
    setAlertLow(false);

    if (!productId || quantity === 0 || !operationDate || quantity <= 0) {
      setMessage({ text: "Preencha todos os campos corretamente (quantidade deve ser maior que 0).", type: "error" });
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/stock/movement/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product: productId,
          quantity_moved: quantity,
          operation_type: operationType,
          operation_date: operationDate,
          movement_responsible: userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.message || "Movimentação registrada com sucesso!", type: "success" });
        // Limpa o formulário após sucesso
        setProductId("");
        setQuantity(0);
        setOperationDate("");
      } else {
        // Exemplo de erro do backend (e.g., saldo insuficiente)
        setMessage({ text: data.error || data.message || "Erro ao registrar a movimentação.", type: "error" });
      }

      // Assume que o backend retorna low_stock_alert se aplicável
      setAlertLow(data.low_stock_alert || false);
    } catch (error) {
      console.error("Erro na transação:", error);
      setMessage({ text: "Erro de conexão ao tentar registrar a movimentação.", type: "error" });
    }
  }

  // Classes de cores para a mensagem de feedback
  const messageClass = message?.type === "success" ? "bg-emerald-100 border-emerald-500 text-emerald-800" : "bg-red-100 border-red-500 text-red-800";
  const messageIcon = message?.type === "success" ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />;

  return (
    // Fundo em cinza claro para dashboard
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-indigo-800 mb-10 text-center">
          📝 Registrar Movimentação de Estoque
        </h1>

        {/* Container do formulário em branco, com sombra mais definida */}
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">

          {/* Seleção do Produto */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Produto
            </label>
            <div className="relative">
              <ArchiveBoxIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150 appearance-none"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
              >
                <option value="">Selecione um produto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Tipo de Movimentação */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-sm text-gray-700">
                Tipo de Operação
              </label>
              <div className="relative">
                {operationType === "Input" ? 
                    <ArrowDownIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" /> :
                    <ArrowUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                }
                <select
                  className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-1 transition duration-150 appearance-none ${operationType === "Input" ? 'focus:border-emerald-500 focus:ring-emerald-500' : 'focus:border-red-500 focus:ring-red-500'}`}
                  value={operationType}
                  onChange={(e) => setOperationType(e.target.value)}
                >
                  <option value="Input">➕ Entrada</option>
                  <option value="Output">➖ Saída</option>
                </select>
              </div>
            </div>

            {/* Quantidade */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-sm text-gray-700">
                Quantidade
              </label>
              <input
                type="number"
                min={1}
                placeholder="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Data */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Data e Hora
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150"
                onChange={(e) => setOperationDate(e.target.value)}
                value={operationDate}
              />
            </div>
          </div>

          {/* Botão Principal - Cor de Ação Destacada */}
          <button
            onClick={registerMovement}
            className="w-full bg-indigo-600 text-white font-extrabold py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 uppercase tracking-wider disabled:bg-gray-400 flex items-center justify-center gap-2"
            disabled={!productId || quantity <= 0 || !operationDate}
          >
            {operationType === "Input" ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
            {operationType === "Input" ? "Confirmar Entrada" : "Confirmar Saída"}
          </button>

          {/* Mensagem de Feedback Aprimorada */}
          {message && (
            <div className={`mt-5 p-3 flex items-center gap-3 border-l-4 rounded-r-md ${messageClass}`} role="alert">
              {messageIcon}
              <p className="text-sm font-semibold">
                {message.text}
              </p>
            </div>
          )}

          {/* Alerta de Estoque Baixo */}
          {alertLow && (
            <p className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 font-bold rounded-r-md">
              🚨 **ALERTA!** O estoque do produto está **abaixo do nível mínimo** após esta transação.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}