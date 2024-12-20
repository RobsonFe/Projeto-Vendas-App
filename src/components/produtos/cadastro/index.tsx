import { Produto } from 'app/models/produtos';
import { useProdutoService } from 'app/services';
import { Layout } from "components";
import { Input } from 'components/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


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
    const [sucess, setSucess] = useState<string>('');
    const [editar, setEditar] = useState<string>('');

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            service.findById(id as string)
                .then(produto => {
                    setProduto(produto);
                })
                .catch(error => {
                    setErro('Erro ao buscar o produto.' + error.message);
                });
        }
     }, []);

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

    const handlePriceChange = (value: string | undefined) => {
        const parsedValue = value ? parseFloat(value.replace(/,/g, '')) : 0;
        setProduto((prev) => ({
            ...prev,
            preco: parsedValue,
        }));
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
            service.update(produtoParaSalvar)
                .then(() => {
                    setEditar('Produto atualizado com sucesso!');
                })
                .catch(error => {
                    setErro('Erro ao atualizar o produto.') 
                });
        }else{
            service.create(produtoParaSalvar)
                .then(produtoResposta => {
                    setProduto({
                        ...produto,
                        id: produtoResposta.id,  // Atualiza o id recebido após salvar
                        cadastro: produtoResposta.cadastro // Atualiza a data de cadastro
                    });
                    setSucess('Produto salvo com sucesso!');
                })
            .catch(error => {
                setErro(`Erro ao salvar o produto. Erro: ${error.message}`);
            });
        }
    };

    const fechar = () => { 
        setErro('');
        setSucess('');
        setEditar('');
    };


    return (
        <Layout titulo="Cadastro de Produtos">
            {erro &&
                <div className="notification is-danger">
                    <button className="delete" onClick={fechar}></button>
                    {erro}
                </div>
            }
            {sucess &&
                <div className="notification is-success">
                    <button className="delete" onClick={fechar}></button>
                    {sucess}
                </div>
            }
            {editar &&
                <div className="notification is-link">
                    <button className="delete" onClick={fechar}></button>
                    {editar}
                </div>
            }
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
                <Input
                        label="Preço: *"
                        name="preco"
                        value={produto.preco}
                        onChange={(e) =>
                            setProduto((prev) => ({
                                ...prev,
                                preco: parseFloat(e.target.value) || 0
                            }))
                        }
                        maskType="currency"
                        placeholder="Digite o preço do Produto"
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
                <div className="control is-link">
                    <Link href="/consultas/produtos">
                        <div className="control">
                            <button className="button is-link is-info">Tabela</button>
                        </div>
                    </Link>
                </div>
                <div className="control is-link">
                    <Link href="/">
                        <div className="control">
                            <button className="button is-link is-warning ">Voltar</button>
                        </div>
                    </Link>
                </div>
            </div>
            
        </Layout>
    );
};
