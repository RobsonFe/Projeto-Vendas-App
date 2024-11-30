package br.com.robson.service;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.model.Produto;
import br.com.robson.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public Page<ProdutoDTO> listar (int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("nome").ascending()); // Buscar por ordem alfabética.
        Page<Produto> produtos = produtoRepository.findAll(pageable);

        // Converte Page<Produto> para Page<ProdutoDTO>
        return produtos.map(ProdutoDTO::fromModel);
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

    public Produto deletar(Produto produtoDTO) {

        Produto produtoToDelete = produtoRepository.findById(produtoDTO.getId())
                .orElseThrow(()-> new RuntimeException("Produto não encontrado"));

        if(!produtoToDelete.getId().equals(produtoDTO.getId())){
            throw new RuntimeException("Id não correspondente ao produto");
        }

        produtoRepository.delete(produtoToDelete);

        return produtoToDelete;
    }

}
