import { Produto } from "app/models/produtos";
import { Layout } from "components/layout";
import Link from "next/link";
import { TabelaComponent } from "./tabela";

export const Tabela: React.FC = () => { 

	const produtos: Produto[] = [
	{
		id: "1",
		nome: "Playstation 5",
		sku: "PS5",
		preco: 5000,
		descricao: "Video Game de Última Geração"
	},
	{
		id: "2",
		nome: "Playstation 4",
		sku: "PS4",
		preco: 2000,
		descricao: "Video Game de Última Geração"
	},
	{
		id: "3",
		nome: "Xbox Series X",
		sku: "XBX",
		preco: 5000,
		descricao: "Video Game de Última Geração"
	},
	{
		id: "4",
		nome: "PSP",
		sku: "PSP",
		preco: 300,
		descricao: "Video Game de Última Geração"
	},
	{
		id: "5",
		nome: "Xbox One",
		sku: "XBO",
		preco: 2000,
		descricao: "Video Game de Última Geração"
	},
	];

	return (
			<Layout titulo="Tabela de Produtos">
				<Link href="/cadastros/produtos">
				<button className="button is-warning">Cadastrar Novo Produto</button>
			</Link>
			<hr/>
			<TabelaComponent produtos={produtos} />
		</Layout>
	);
};