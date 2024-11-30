import { httpClient } from 'app/http';
import { PaginatedResponse, Produto } from 'app/models/produtos';
import { AxiosResponse } from 'axios';

const resourceURL: string = "/api/v1/produtos/";

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        try {     
            const response: AxiosResponse<Produto> = await httpClient.post<Produto>(`${resourceURL}salvar/`,produto)
            console.log("Produto Salvo Com Sucesso! ", JSON.stringify(produto, null, 4));
            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        try {
            const url: string = `${resourceURL}atualizar/${produto.id}`; 
            await httpClient.put<Produto>(url, produto);
            console.log("Produto Atualizado Com Sucesso!", JSON.stringify(produto, null, 4));
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // const buscarTodos = async (): Promise<Produto[]> => { 
    //     try {
    //         const response: AxiosResponse<Produto[]> = await httpClient.get<Produto[]>(resourceURL);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`${error}`);
    //     }
    // };

    const buscarPaginado = async (page: number, size: number): Promise<PaginatedResponse<Produto>> => {
        try {
            const url: string = `${resourceURL}?page=${page}&size=${size}`;
            const response: AxiosResponse<PaginatedResponse<Produto>> = await httpClient.get<PaginatedResponse<Produto>>(url);
            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
};

    const deletar = async (id: string): Promise<void> => { 
        try {
            const url: string = `${resourceURL}deletar/${id}`;
            await httpClient.delete(url);
            console.log("Produto Deletado Com Sucesso!", JSON.stringify(id, null, 4));
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    return {
        salvar,
        atualizar
    }
}