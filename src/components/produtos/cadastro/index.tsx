import { Produto } from 'app/models/produtos';
import { useProdutoService } from 'app/services';
import { Layout } from "components";
import { Input } from 'components/common';
import React, { useState } from 'react';


export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [produto, setProduto] = useState<Produto>({
        nome: '',
        preco: undefined,
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
                .catch(error => setErro(`Erro ao salvar o produto. Erro: ${error.message}`));
        }
    };


    return (
        <Layout titulo="Cadastro de Produtos">

            { produto.id &&

            <div className="columns">
                    <Input
                        label="Código"
                        className='is-half'
                        id='id'
                        name="id"
                        value={produto.id}
                        type="text"
                        disabled
                    />
                    <Input
                        label="Data de Cadastro"
                        className='is-half'
                        id='cadastro'
                        name="cadastro"
                        value={produto.cadastro}
                        type="text"
                        disabled
                    />
            </div>
            }
            <div className='columns'>
                <Input
                    label="Nome: *"
                    className='is-full'
                    name="nome"
                    value={produto.nome}
                    placeholder='Digite o nome do Produto'
                    onChange={handleChange}
                    type="text"
                />
            </div>
            
            <div className='columns'>
                <Input label="Preço: *"
                    className='is-half'
                    name="preco"
                    value={produto.preco}
                    onChange={handleChange}
                    type="text"
                    placeholder='Digite o preço do Produto'
                />
                
                <Input label="SKU: *"
                    className='is-half'
                    name="sku"
                    value={produto.sku}
                    onChange={handleChange}
                    type="text"
                    placeholder='Digite o SKU do Produto'
                />
            </div>
        

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="descricao">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="descricao"
                            name='descricao'
                            value={produto.descricao}
                            onChange={handleChange}
                            placeholder="Digite a Descrição do Produto"
                            required
                        />
                    </div>
                </div>
            </div>
            
              <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button is-link">
                       {
                            produto.id ? "Atualizar" : "Salvar"
                       }
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
           </div>

            {erro && <p className="has-text-danger">{erro}</p>}
            
        </Layout>
    );
};
