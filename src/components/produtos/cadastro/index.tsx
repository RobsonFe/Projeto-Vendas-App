import { useState } from 'react'
import { Layout } from "components"

export const CadastroProdutos: React.FC = () =>{

    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [sku, setSku] = useState('')
    const [descricao, setDescricao] = useState('')

    const submit = () =>{

        let produtos = {

            nome: nome,
            preco: preco,
            sku: sku,
            descricao: descricao
        }

        console.log(produtos)
    }

    return(
        <Layout titulo="Cadastro de Produtos">
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputNome" >Nome: *</label>
                <div className="control">
                <input className="input" id="inputNome" value={nome} onChange={ event => setNome(event.target.value)} type="text" placeholder="Digite o Nome do Produto" required></input>
                </div>
                
            </div>
            </div>
            

            <div className="columns">
            <div className="field is-half column">
                <label className="label" htmlFor="inputPreco" >Preço: *</label>
                <div  className="control">
                <input className="input" id="inputPreco" value={preco} onChange={ event => setPreco( event.target.value)} type="text" placeholder="Digite o Preco do Produto" required></input>
                </div>
                
            </div>

            <div className="field is-half column">
                <label className="label" htmlFor="inputSKU"  >SKU: *</label>
                <div className="control">
                <input className="input" id="inputSKU" value={sku} onChange={ event => setSku( event.target.value)} type="text" placeholder="Digite o SKU do Produto" required></input>
                </div>
                
            </div>
            </div>
            
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputDesc" >Descrição: *</label>
                <div  className="control">
                <textarea className="textarea" id="inputDesc" value={descricao} onChange={ event => setDescricao( event.target.value)} placeholder="Digite a Descrição do Produto" required></textarea>
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
    )
}