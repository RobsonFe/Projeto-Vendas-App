package br.com.robson.controller;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.robson.model.Produto;

import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	// Método para salvar um produto
	@PostMapping
	public ResponseEntity<ProdutoDTO> salvar(@RequestBody ProdutoDTO produtoDTO) {
		Produto produtoSalvo = produtoService.salvar(produtoDTO);
		ProdutoDTO produtoDTOSalvo = ProdutoDTO.fromModel(produtoSalvo);
		return ResponseEntity.ok(produtoDTOSalvo);
	}

	// Método para atualizar um produto
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {

		produtoDTO.setId(id);

		try {
			produtoService.atualizar(produtoDTO.toModel());
			return ResponseEntity.ok().build();
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
