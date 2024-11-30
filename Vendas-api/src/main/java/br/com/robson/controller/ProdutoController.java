package br.com.robson.controller;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.repository.ProdutoRepository;
import br.com.robson.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@RequestMapping("/api/v1/produtos/")
@Tag(name = "Produtos", description = "API para gerenciamento de Vendas")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;
    @Autowired
    private ProdutoRepository produtoRepository;

	@Operation(summary = "Salva um Produto", description = "Adiciona um novo Produto")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Produto criado com sucesso",
					content = @Content(schema = @Schema(implementation = Produto.class))),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos",
					content = @Content),
			@ApiResponse(responseCode = "500", description = "Erro no servidor",
					content = @Content)
	})
	@ResponseStatus(HttpStatus.CREATED)
	// Método para salvar um produto
	@PostMapping("salvar/")
	public ResponseEntity<ProdutoDTO> salvar(@RequestBody ProdutoDTO produtoDTO) {
		Produto produtoSalvo = produtoService.salvar(produtoDTO);
		ProdutoDTO produtoDTOSalvo = ProdutoDTO.fromModel(produtoSalvo);
		return ResponseEntity.ok(produtoDTOSalvo);
	}

	@Operation(summary = "Lista todos os Produtos", description = "Retorna uma lista de todos os Produtos")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de Produtos retornada com sucesso",
					content = @Content(schema = @Schema(implementation = Produto.class))),
			@ApiResponse(responseCode = "500", description = "Erro no servidor",
					content = @Content)
	})
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("listar")
	public ResponseEntity<Page<ProdutoDTO>> listarProdutos(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size
	) {
		Page<ProdutoDTO> produtos = produtoService.listar(page, size);
		return ResponseEntity.ok(produtos);
	}

	@Operation(summary = "Busca um Produto pelo ID", description = "Retorna dados de um Produto")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Produto encontrado",
					content = @Content(schema = @Schema(implementation = Produto.class))),
			@ApiResponse(responseCode = "404", description = "Produto não encontrado",
					content = @Content),
			@ApiResponse(responseCode = "500", description = "Erro no servidor",
					content = @Content)
	})
	@ResponseStatus(HttpStatus.OK)
	@GetMapping("buscar/{id}")
	public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Long id) {
		ProdutoDTO produtoDTO = produtoService.buscarPorId(id);
		return ResponseEntity.ok(produtoDTO);
	}

	@GetMapping("/buscar/nome")
	public ResponseEntity<List<ProdutoDTO>> buscarPorNome(@RequestParam String nome) {
		List<ProdutoDTO> produtos = produtoService.buscarPorNome(nome);
		return ResponseEntity.ok(produtos);
	}

	@Operation(summary = "Atualiza um Produto", description = "Atualiza as informações de um Produto existente")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso",
					content = @Content(schema = @Schema(implementation = Produto.class))),
			@ApiResponse(responseCode = "404", description = "Produto não encontrado",
					content = @Content),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos",
					content = @Content),
			@ApiResponse(responseCode = "500", description = "Erro no servidor",
					content = @Content)
	})
	@ResponseStatus(HttpStatus.OK)
	// Método para atualizar um produto
	@PutMapping("atualizar/{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody Produto produto) {

		produto.setId(id);

		try {
			produtoService.atualizar(produto);
			return ResponseEntity.ok().build();
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "Deleta um Produto", description = "Remove um Produto pelo ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "204", description = "Produto deletado com sucesso",
					content = @Content),
			@ApiResponse(responseCode = "404", description = "Produto não encontrado",
					content = @Content),
			@ApiResponse(responseCode = "500", description = "Erro no servidor",
					content = @Content)
	})
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("deletar/{id}")
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
