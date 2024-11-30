export interface Produto {
    id?: string;
    nome?: string;
    descricao?: string;
    preco?:number;
    sku?: string;
    cadastro?: string;
}

export interface PaginatedResponse<T> {
  content: T[];         // Lista de produtos
  totalPages: number;   // Número total de páginas
  totalElements: number; // Número total de elementos
  size: number;         // Número de itens por página
  number: number;       // Página atual
}
