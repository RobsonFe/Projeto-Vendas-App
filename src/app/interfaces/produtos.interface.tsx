import { Produto } from "app/models/produtos";
import { useState } from "react";

interface ProdutoProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const ProdutosRow: React.FC<ProdutoProps> = ({ produto, onEdit: edit, onDelete }) => {
    const [toDelete, setToDelete] = useState<boolean>(false);

    const handleDelete = () => {
        if (toDelete) {
            onDelete(produto);
            setToDelete(false);
        } else {
            setToDelete(true);
        }
    };

    const handleCancel = () => {
        setToDelete(false);
    };

    return (
        <tr className="is-justify-content-center">
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.sku}</td>
            <td>{produto.preco}</td>
            <td>{produto.descricao}</td>
            <td className="field is-grouped">
                {!toDelete ? (
                    <>
                        <div className="control">
                            <button
                                className="button is-warning is-rounded is-small"
                                onClick={() => edit(produto)}
                            >
                                Editar
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-danger is-rounded is-small"
                                onClick={handleDelete}
                            >
                                Deletar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="control">
                            <button
                                className="button is-danger is-rounded is-small"
                                onClick={handleDelete}
                            >
                                Confirmar
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-warning is-rounded is-small"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                )}
            </td>
        </tr>
    );
};
