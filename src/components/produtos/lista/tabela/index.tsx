import { ProdutosRow } from "app/interfaces/produtos.interface";
import { Produto } from "app/models/produtos";
import { useRouter } from "next/router";
import React from "react";

export interface TabelaProdutosProps { 
	produtos: Produto[];
};

export const TabelaComponent: React.FC<TabelaProdutosProps> = ({ produtos }) => {
	const router = useRouter();

	function editar(produto: Produto) {
		const url = `/cadastros/produtos?id=${produto.id}`;
		router.push(url);
	}

	function deletar(produto: Produto) {
		console.log("Deletando produto:", produto);
	}

		return (
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
					{
						produtos.map((produto, index) => (
							<ProdutosRow key={index} produto={produto} edit={editar} onDelete={deletar}/>
						))
					}
				</tbody>
			</table>
		);
};