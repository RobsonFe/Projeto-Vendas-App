import { Produto } from "app/models/produtos";

interface ProdutoProps { 
	produto: Produto;
}

export const ProdutosRow: React.FC<ProdutoProps> = ({ produto }) => { 
	return (
		<tr className="is-justify-content-center">
			<td>{produto.id}</td>
			<td>{produto.nome}</td>
			<td>{produto.sku}</td>
			<td>{produto.preco}</td>
			<td>{produto.descricao}</td>
			<td className="field is-grouped">
				<div className="control is-link">
				<button className="button is-warning">Editar</button>
				</div>
				<div className="control">
				<button className="button is-danger">Excluir</button>
				</div>
			</td>
		</tr>
	);
};