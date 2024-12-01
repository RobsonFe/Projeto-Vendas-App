import { ProdutosRow } from "app/interfaces/produtos.interface";
import { Produto } from "app/models/produtos";
import React from "react";

export interface TabelaProdutosProps { 
	produtos: Produto[];
};

export const TabelaComponent: React.FC<TabelaProdutosProps> = ({produtos}) => {
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
							<ProdutosRow key={index} produto={produto} />
						))
					}
				</tbody>
			</table>
		);
};