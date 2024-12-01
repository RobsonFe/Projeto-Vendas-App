import { ProdutosRow } from "app/interfaces/produtos.interface";
import { Produto } from "app/models/produtos";
import { ProdutoService } from "app/services/produto.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface TabelaProdutosProps {
    produtos: Produto[];
};

export const TabelaComponent: React.FC<TabelaProdutosProps> = ({ produtos }) => {
    const router = useRouter();
    const { buscarTodos, deletar } = ProdutoService();

    const [list, setList] = useState<Produto[]>(produtos);
    const [sucessDelete, setSucessDelete] = useState<string>("");

    const handleEdit = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url);
    };

    const handleDelete = (produto: Produto) => {
        if (!produto.id) return;

        deletar(produto.id)
            .then(() => {
                setSucessDelete(`Produto ${produto.nome} deletado com sucesso!`);
                setList((prevList) => prevList.filter((p) => p.id !== produto.id));
            })
            .catch((err) => console.error("Erro ao deletar produto:", err));
    };

    useEffect(() => {
        buscarTodos()
            .then((data) => {
                setList(data || []);
            })
            .catch((err) => console.error("Erro ao buscar produtos:", err));
    }, []);

    const fechar = () => {
        setSucessDelete("");
    };

    return (
        <>
            {sucessDelete && (
                <div className="notification is-success">
                    <button className="delete" onClick={fechar}></button>
                    {sucessDelete}
                </div>
            )}
            <table className="table table-hover is-narrow is-hoverable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>SKU</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((produto, index) => (
                        <ProdutosRow
                            key={index}
                            produto={produto}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};
