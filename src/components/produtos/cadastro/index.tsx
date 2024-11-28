import { Produto } from 'app/models/produtos';
import { useProdutoService } from 'app/services';
import { Layout } from "components";
import React, { useState } from 'react';


export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [produto, setProduto] = useState<Produto>({
        nome: '',
        preco: 0,
        sku: '',
        descricao: '',
        id: '',
        cadastro: ''
    });
    const [erro, setErro] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Converter preco para número, se for necessário.
        if (name === 'preco') {
            setProduto(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0 
            }));
        } else {
            setProduto(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validarFormulario = () => {
        const validationCase = () => {
            if (!produto.nome || !produto.preco || !produto.sku || !produto.descricao) return 1;
            if (produto.preco < 0) return 2;
            if (isNaN(produto.preco)) return 3;
            if (produto.preco === 0) return 4;
            if (produto.sku.length < 3) return 5;
            return 0;
        };

        switch (validationCase()) {
            case 1:
                setErro('Todos os campos obrigatórios precisam ser preenchidos.');
                return false;
            case 2:
                setErro('O preço do produto não pode ser negativo.');
                return false;
            case 3:
                setErro('O preço do produto deve ser um número.');
                return false;
            case 4:
                setErro('O preço do produto não pode ser zero.');
                return false;
            case 5:
                setErro('O SKU do produto deve ter no mínimo 3 caracteres.');
                return false;
            default:
                setErro('');
                return true;
        }
    };

    const submit = () => {
        if (!validarFormulario()) return;
        
         const produtoParaSalvar: Produto = { ...produto, preco: parseFloat(produto.preco?.toString() || '0') };

        if(produto.id){
            service.atualizar(produtoParaSalvar)
                .catch(error => setErro('Erro ao atualizar o produto.'));
        }else{
            service.salvar(produtoParaSalvar)
                .then(produtoResposta => {
                    setProduto({
                        ...produto,
                        id: produtoResposta.id,  // Atualiza o id recebido após salvar
                        cadastro: produtoResposta.cadastro // Atualiza a data de cadastro
                    });
                })
                .catch(error => setErro('Erro ao salvar o produto. Tente novamente.'));
        }
    };


    return (
        <Layout titulo="Cadastro de Produtos">

            { produto.id &&

            <div className="columns">

                <div className="field is-half column">
                    <label className="label" htmlFor="id">Código</label>
                    <div className="control">
                        <input className="input" id="id" name='id' value={produto.id} type="text" disabled />
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="cadastro">Data de Cadastro</label>
                    <div className="control">
                        <input className="input" id="cadastro" name='cadastro' value={produto.cadastro} type="text" disabled />
                    </div>
                </div>
            </div>
            }

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="nome">Nome: *</label>
                    <div className="control">
                        <input className="input" id="nome" name='nome' value={produto.nome} onChange={handleChange} type="text" placeholder="Digite o Nome do Produto" required />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field is-half column">
                    <label className="label" htmlFor="preco">Preço: *</label>
                    <div className="control">
                        <input className="input" id="preco" name='preco' value={produto.preco} onChange={handleChange} type="text" placeholder="Digite o Preço do Produto" required />
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="sku">SKU: *</label>
                    <div className="control">
                        <input className="input" id="sku" name='sku' value={produto.sku} onChange={handleChange} type="text" placeholder="Digite o SKU do Produto" required />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="descricao">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea" id="descricao" name='descricao' value={produto.descricao} onChange={handleChange} placeholder="Digite a Descrição do Produto" required />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>
                        {
                            produto.id ? "Atualizar" : "Salvar"
                        }
                    </button>
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

            {erro && <p className="has-text-danger">{erro}</p>}
            
        </Layout>
    );
};
