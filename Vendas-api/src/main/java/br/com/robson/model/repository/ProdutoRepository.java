package br.com.robson.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.robson.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
		
}
