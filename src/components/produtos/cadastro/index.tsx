import React, { useState } from 'react';
import { Layout } from "components";
import { useProdutoService } from 'app/services';
import { Produto } from 'app/models/produtos';

export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [sku, setSku] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState<string>('');
    const [cadastro, setCadastro] = useState<string>('');

    const submit = () => {
        const produtos: Produto = {
            nome: nome,
            preco: parseFloat(preco),
            sku: sku,
            descricao: descricao
        };

        service.salvar(produtos)
        .then(produtoResposta => {
            setId(produtoResposta.id);
            setCadastro(produtoResposta.cadastro);
        });
    };

    return (
        <Layout titulo="Cadastro de Produtos">

            { id &&

            <div className="columns">

                <div className="field is-half column">
                    <label className="label" htmlFor="inputCodigo">Código</label>
                    <div className="control">
                        <input className="input" id="inputCodigo" value={id} type="text" disabled />
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="inputDataCadastro">Data de Cadastro</label>
                    <div className="control">
                        <input className="input" id="inputDataCadastro" value={cadastro} type="text" disabled />
                    </div>
                </div>
            </div>
            }

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputNome">Nome: *</label>
                    <div className="control">
                        <input className="input" id="inputNome" value={nome} onChange={event => setNome(event.target.value)} type="text" placeholder="Digite o Nome do Produto" required />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field is-half column">
                    <label className="label" htmlFor="inputPreco">Preço: *</label>
                    <div className="control">
                        <input className="input" id="inputPreco" value={preco} onChange={event => setPreco(event.target.value)} type="text" placeholder="Digite o Preço do Produto" required />
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="inputSKU">SKU: *</label>
                    <div className="control">
                        <input className="input" id="inputSKU" value={sku} onChange={event => setSku(event.target.value)} type="text" placeholder="Digite o SKU do Produto" required />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea" id="inputDesc" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Digite a Descrição do Produto" required />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>Salvar</button>
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </Layout>
    );
};
