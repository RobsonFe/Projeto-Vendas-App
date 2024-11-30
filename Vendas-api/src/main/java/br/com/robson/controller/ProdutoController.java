package br.com.robson.controller;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.repository.ProdutoRepository;
import br.com.robson.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.robson.model.Produto;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;
    @Autowired
    private ProdutoRepository produtoRepository;

	// Método para salvar um produto
	@PostMapping("/salvar/")
	public ResponseEntity<ProdutoDTO> salvar(@RequestBody ProdutoDTO produtoDTO) {
		Produto produtoSalvo = produtoService.salvar(produtoDTO);
		ProdutoDTO produtoDTOSalvo = ProdutoDTO.fromModel(produtoSalvo);
		return ResponseEntity.ok(produtoDTOSalvo);
	}


	@GetMapping("/listar")
	public ResponseEntity<Page<ProdutoDTO>> listarProdutos(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size
	) {
		Page<ProdutoDTO> produtos = produtoService.listar(page, size);
		return ResponseEntity.ok(produtos);
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

	@DeleteMapping("{id}")
	public ResponseEntity<Void> remover(@PathVariable Long id) {

        var produtoToDelete = produtoRepository.findById(id);

		if (produtoToDelete.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id inválido");
		}

		try {
			produtoService.deletar(produtoToDelete.get());
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
