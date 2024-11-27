import { httpClient } from 'app/http'
import { Produto } from 'app/models/produtos'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        
        console.log("Produto a ser salvo:", JSON.stringify(produto, null, 4));

        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto)

        console.log("Produto Cadastrado Com Sucesso!")
        return response.data;
    }

    const atualizar = async (produto: Produto) : Promise<void> => {

        const url: string = `${resourceURL}/${produto.id}`; 
        await httpClient.put<Produto>(url, produto);
    }

    return {
        salvar,
        atualizar
    }
}