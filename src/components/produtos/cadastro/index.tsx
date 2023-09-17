import { Layout } from "components"

export const CadastroProdutos: React.FC = () =>{

    return(
        <Layout titulo="Cadastro de Produtos">
            <div className="columns">
            <div className="field column is-full">
                <label className="label" >Nome: *</label>
                <div htmlFor="inputNome" className="control">
                <input className="input" id="inputNome" type="text" placeholder="Digite o Nome do Produto" required></input>
                </div>
                
            </div>
            </div>
            

            <div className="columns">
            <div className="field is-half column">
                <label className="label" >Preço: *</label>
                <div htmlFor="inputPreco" className="control">
                <input className="input" id="inputPreco" type="number" placeholder="Digite o Preco do Produto" required></input>
                </div>
                
            </div>

            <div className="field is-half column">
                <label className="label" >SKU: *</label>
                <div htmlFor="inputSKU" className="control">
                <input className="input" id="inputSKU" type="text" placeholder="Digite o SKU do Produto" required></input>
                </div>
                
            </div>
            </div>
            
            <div className="columns">
            <div className="field column is-full">
                <label className="label" >Descrição: *</label>
                <div htmlFor="inputDesc" className="control">
                <textarea className="textarea" id="inputDesc" placeholder="Digite a Descrição do Produto" required></textarea>
                </div>
                
            </div>
            </div>

            <div className="field is-grouped">
            <div className="control">
            <button className="button is-link">Salvar</button>
            <button className="button is-link is-light">Voltar</button>
            </div>
            </div>
        </Layout>
    )
}