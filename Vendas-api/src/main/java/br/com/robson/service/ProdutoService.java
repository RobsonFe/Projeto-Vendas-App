package br.com.robson.service;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.model.Produto;
import br.com.robson.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto salvar(ProdutoDTO produtoDTO) {

        Produto produto = new Produto();

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setSku(produtoDTO.getSku());

        return produtoRepository.save(produto);
    }

    public Produto atualizar (Produto produtoDTO) {

        Produto produto = produtoRepository.findById(produtoDTO.getId())
                .orElseThrow(()-> new RuntimeException("Produto não encontrado"));

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setSku(produtoDTO.getSku());

        return produtoRepository.save(produtoDTO);
    }

}
