import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { Layout } from "components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TabelaComponent } from "./tabela";

export const Tabela: React.FC = () => { 

	const { fetchAll } = useProdutoService();

	const [produtos, setProdutos] = useState<Produto[]>([]);

	useEffect(() => {
	fetchAll()
		.then(data => {
			setProdutos(data);
		})
		.catch(err => console.error("Erro ao buscar produtos:", err));
	}, []);
	
	

	return (
		// <>
		// 	{!produtos ? (
		// 		<div className="is-align-items-center">
		// 			<Loader/>
		// 		</div>
		// 	) : (
		// 		<Layout titulo="Tabela de Produtos">
		// 			<Link href="/cadastros/produtos">
		// 				<button className="button is-warning">Cadastrar Novo Produto</button>
		// 			</Link>
		// 			<hr/>
		// 			<TabelaComponent produtos={produtos} />
		// 		</Layout>
		// 	)}
		// </>

		<Layout titulo="Tabela de Produtos">
				<Link href="/cadastros/produtos">
					<button className="button is-warning">Cadastrar Novo Produto</button>
				</Link>
						<hr/>
				<TabelaComponent produtos={produtos} />
		 	</Layout>
	);
};