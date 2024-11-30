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

import java.util.List;
import java.util.Optional;

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

        return produtoRepository.save(produtoDTO);
    }

    @Transactional
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
