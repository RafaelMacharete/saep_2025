"use client";

import { useEffect, useState } from "react";
import Header from "../components/header/page";
// Importando ícones para melhorar a usabilidade
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]); // Tipagem melhorada
    const [search, setSearch] = useState("");

    // Modal states
    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null); // Tipagem melhorada

    // Form fields
    const [name, setName] = useState("");
    const [current, setCurrent] = useState<string | number>("");
    const [minimum, setMinimum] = useState<string | number>("");
    const [description, setDescription] = useState("");

    // --- LÓGICA DE DADOS (INALTERADA) ---

    async function fetchProducts(query = "") {
        const url = query
            ? `http://localhost:8000/api/products/?name=${query}`
            : `http://localhost:8000/api/products/`;

        try {
            const res = await fetch(url, {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok) setProducts(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function openCreateModal() {
        setEditId(null);
        setName("");
        setCurrent("");
        setMinimum("");
        setDescription("");
        setModalOpen(true);
    }

    function openEditModal(product: any) {
        setEditId(product.id);
        setName(product.name);
        setCurrent(product.current_quantity);
        setMinimum(product.minimum_quantity);
        setDescription(product.description || "");
        setModalOpen(true);
    }

    async function handleSave() {
        if (!name || !current || !minimum) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const payload = {
            name,
            current_quantity: Number(current),
            minimum_quantity: Number(minimum),
            description,
        };

        const url = editId
            ? `http://localhost:8000/api/products/${editId}/`
            : `http://localhost:8000/api/products/`;

        const method = editId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                fetchProducts();
                setModalOpen(false);

                // 🔥 ALERTA AUTOMÁTICO
                if (Number(current) < Number(minimum)) {
                    alert("A quantidade atual está menor do que o mínimo permitido!");
                }
            } else {
                alert("Erro ao salvar. Verifique os dados.");
            }
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro de conexão ao salvar.");
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;

        try {
            const res = await fetch(
                `http://localhost:8000/api/products/${id}/`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (res.ok) fetchProducts();
            else alert("Erro ao excluir.");
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Erro de conexão ao excluir.");
        }
    }

    function handleSearchSubmit() {
        fetchProducts(search);
    }

    // --- NOVO LAYOUT (INDIGO) ---
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-800">
                        📦 Inventário de Produtos
                    </h1>
                    {/* Botão Novo com Ícone e Destaque */}
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Novo Produto
                    </button>
                </div>
                
                {/* Busca */}
                <div className="flex gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Buscar produto por nome..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="px-5 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabela de Dados - Modernizada */}
                <div className="bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Atual</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Mínimo</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
                                        Nenhum produto encontrado.
                                    </td>
                                </tr>
                            ) : (
                                products.map((p: any) => {
                                    const low = p.current_quantity < p.minimum_quantity;

                                    return (
                                        <tr
                                            key={p.id}
                                            // Destaque mais forte para estoque baixo
                                            className={`hover:bg-indigo-50 ${low ? "bg-red-50 border-l-4 border-red-500" : ""}`}
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                                            <td className={`px-6 py-4 ${low ? "text-red-700 font-bold" : ""}`}>
                                                {p.current_quantity}
                                            </td>
                                            <td className="px-6 py-4">{p.minimum_quantity}</td>
                                            <td className="px-6 py-4 text-sm max-w-xs truncate">{p.description || "—"}</td>

                                            {/* Ações com Ícones */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                                                <button
                                                    onClick={() => openEditModal(p)}
                                                    title="Editar"
                                                    className="text-indigo-600 hover:text-indigo-900 transition"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    title="Excluir"
                                                    className="text-gray-400 hover:text-red-600 transition"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Modernizado */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl transform transition-all">
                        <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b pb-2">
                            {editId ? "✍️ Editar Produto" : "✨ Novo Produto"}
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Nome do Produto (Ex: Parafuso M8)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Atual</label>
                                    <input
                                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Atual"
                                        type="number"
                                        value={current}
                                        onChange={(e) => setCurrent(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Mínima</label>
                                    <input
                                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Mínimo de Alerta"
                                        type="number"
                                        value={minimum}
                                        onChange={(e) => setMinimum(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Descrição detalhada (opcional)"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Botões */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}