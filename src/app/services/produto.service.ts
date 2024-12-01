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
            const err = error as any;
            throw new Error(err.response?.data?.message || err.message || "Erro no fetch dos dados");

        }
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        try {
            const url: string = `${resourceURL}atualizar/${produto.id}`; 
            await httpClient.put<Produto>(url, produto);
            console.log("Produto Atualizado Com Sucesso!", JSON.stringify(produto, null, 4));
        } catch (error) {
            const err = error as any;
            throw new Error(err.response?.data?.message || err.message || "Erro no fetch dos dados");

        }
    }

    const buscarTodos = async (): Promise<Produto[]> => {
    try {
        const response = await httpClient.get(`${resourceURL}listar`);
        return response.data.content || []; 
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
};


    const buscarPaginado = async (page: number, size: number): Promise<PaginatedResponse<Produto>> => {
    try {
        const url: string = `${resourceURL}listar?page=${page}&size=${size}`;
        const response = await httpClient.get(url);
        // console.log("Produtos Paginados: ", JSON.stringify(response.data, null, 4));
        return response.data || [];
    } catch (error) {
        console.error("Erro ao buscar produtos paginados:", error);
        throw new Error("Erro ao buscar produtos paginados.");
    }
    };
    
    // buscarPaginado(0, 10);

    
    const buscarPorId = async (id: string): Promise<Produto> => {
        try {
            const url: string = `${resourceURL}buscar/${id}`;
            const response: AxiosResponse<Produto> = await httpClient.get<Produto>(url);
            return response.data;
        } catch (error) {
            const err = error as any;
            throw new Error(err.response?.data?.message || err.message || "Erro no fetch dos dados");

        }
    };

    const buscarPorNome = async (nome: string): Promise<Produto[]> => {
        try {
            const url: string = `${resourceURL}buscar/nome?nome=${nome}`;
            const response: AxiosResponse<Produto[]> = await httpClient.get<Produto[]>(url);
            return response.data;
        } catch (error) {
            const err = error as any;
            throw new Error(err.response?.data?.message || err.message || "Erro no fetch dos dados");

        }
    };

    const deletar = async (id: string): Promise<void> => { 
        try {
            const url: string = `${resourceURL}deletar/${id}`;
            await httpClient.delete(url);
            console.log("Produto Deletado Com Sucesso!", JSON.stringify(id, null, 4));
        } catch (error) {
            const err = error as any;
            throw new Error(err.response?.data?.message || err.message || "Erro no fetch dos dados");

        }
    }

    return {
        salvar,
        atualizar,
        deletar,
        buscarPaginado,
        buscarPorId,
        buscarPorNome,
        buscarTodos
    }
}