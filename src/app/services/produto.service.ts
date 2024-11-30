import { httpClient } from 'app/http'
import { Produto } from 'app/models/produtos'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/v1/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        try {     
            const response: AxiosResponse<Produto> = await httpClient.post<Produto>(`${resourceURL}/salvar/`,produto)
            console.log("Produto Salvo Com Sucesso! ", JSON.stringify(produto, null, 4));
            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        try {
            const url: string = `${resourceURL}/atualizar/${produto.id}`; 
            await httpClient.put<Produto>(url, produto);
            console.log("Produto Atualizado Com Sucesso!", JSON.stringify(produto, null, 4));
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    return {
        salvar,
        atualizar
    }
}