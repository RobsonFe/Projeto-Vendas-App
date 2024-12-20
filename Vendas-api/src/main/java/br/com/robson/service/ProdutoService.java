package br.com.robson.service;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.model.Produto;
import br.com.robson.repository.ProdutoRepository;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final EntityManager entityManager;

    public ProdutoService(ProdutoRepository produtoRepository, EntityManager entityManager) {
        this.produtoRepository = produtoRepository;
        this.entityManager = entityManager;
    }

    @Transactional
    public Produto salvar(ProdutoDTO produtoDTO) {

        Produto produto = new Produto();

        validarProduto(produtoDTO);

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setSku(produtoDTO.getSku());

        return produtoRepository.save(produto);
    }

    @Transactional(readOnly = true)
    public Page<ProdutoDTO> listar (int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("nome").ascending()); // Buscar por ordem alfabética.
        Page<Produto> produtos = produtoRepository.findAll(pageable);

        // Converte Page<Produto> para Page<ProdutoDTO>
        return produtos.map(ProdutoDTO::fromModel);
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> buscarPorNome(String nome) {
        String jpql = "SELECT c FROM Produto c WHERE c.nome LIKE :nome";
        TypedQuery<ProdutoDTO> query = entityManager.createQuery(jpql, ProdutoDTO.class);
        query.setParameter("nome", "%" + nome + "%");
        return query.getResultList();
    }

    @Transactional(readOnly = true)
    public ProdutoDTO buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return ProdutoDTO.fromModel(produto);
    }


    @Transactional
    public Produto atualizar (Produto produtoDTO) {

        Produto produto = produtoRepository.findById(produtoDTO.getId())
                .orElseThrow(()-> new RuntimeException("Produto não encontrado"));

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setSku(produtoDTO.getSku());

        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto deletar(Long id) {

        Produto produtoToDelete = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        produtoRepository.delete(produtoToDelete);
        return produtoToDelete;
    }


    private void validarProduto(ProdutoDTO produto) {
        if (produto.getNome() == null || produto.getNome().isEmpty()) {
            throw new IllegalArgumentException("Nome do produto não pode ser vazio");
        }
        if (produto.getDescricao() == null || produto.getDescricao().isEmpty()) {
            throw new IllegalArgumentException("Descrição do produto não pode ser vazia");
        }
        if (produto.getPreco() == null || produto.getPreco().compareTo(BigDecimal.valueOf(0.0)) <= 0) {
            throw new IllegalArgumentException("Preço do produto não pode ser menor ou igual a zero");
        }
        if (produto.getSku() == null || produto.getSku().isEmpty()) {
            throw new IllegalArgumentException("SKU do produto não pode ser vazio");
        }
    }

}
