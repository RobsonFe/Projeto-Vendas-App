import { Produto } from "app/models/produtos";

interface ProdutoProps { 
	produto: Produto;
	onEdit: (produto: Produto) => void;
	onDelete: (produto: Produto) => void;
}

export const ProdutosRow: React.FC<ProdutoProps> = ({ produto, onEdit: edit, onDelete }) => { 
	return (
		<tr className="is-justify-content-center">
			<td>{produto.id}</td>
			<td>{produto.nome}</td>
			<td>{produto.sku}</td>
			<td>{produto.preco}</td>
			<td>{produto.descricao}</td>
			<td className="field is-grouped">
				<div className="control is-link">
				<button className="button is-warning is-rounded is-small" onClick={() => edit(produto)}>Editar</button>
				</div>
				<div className="control">
				<button className="button is-danger is-rounded is-small" onClick={() => onDelete(produto)}>Excluir</button>
				</div>
			</td>
		</tr>
	);
};