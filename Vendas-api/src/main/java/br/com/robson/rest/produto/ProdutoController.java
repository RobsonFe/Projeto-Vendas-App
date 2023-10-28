package br.com.robson.rest.produto;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.robson.model.Produto;
import br.com.robson.model.repository.ProdutoRepository;


@RestController // Controlador da operação
@RequestMapping("/api/produtos") // Request para localizar o mapeamento da pagina/ a rota.
@CrossOrigin("*") // aceita APIs externas poderia ser "http://localhost:3000/"
public class ProdutoController {
	
		@Autowired  //Faz a instancia da classe.
		private ProdutoRepository repository;
		
		@PostMapping // recebenfdo o metodo post de uma requisição
		public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto) {
			
			
//			Produto entidadeProduto = new Produto(produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getSku());
			
			Produto entidadeProduto = produto.toModel();
			
			repository.save(entidadeProduto);
			
//			produto.setId(entidadeProduto.getId());
			
//			return produto;
			
			return ProdutoFormRequest.fromModel(entidadeProduto);
			
//			System.out.println(entidadeProduto);
//			return produto;
			
			// RequestBody convertendo um arquivo Json em String vindo do corpo da requisição. 
			//Classe ProdutoFormRequest sendo instanciada para receber os dados do Front-End como parametro. 

			
			}
		
		// Atualizando o produto
		
		@PutMapping("{id}")
		public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto) {
			
			Optional<Produto> produtoExistente = repository.findById(id);
			
			if(produtoExistente.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			
			// O repository só atualiza o produto se chamar um id, se não chamar id, ele vai salvar.
			Produto entidade = produto.toModel();
			entidade.setId(id);
			repository.save(entidade);
			
			return ResponseEntity.ok().build();
			
		} 
}
