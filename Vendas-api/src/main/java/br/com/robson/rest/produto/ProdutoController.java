package br.com.robson.rest.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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
			
		} // RequestBody convertendo um arquivo Json em String vindo do corpo da requisição. 
		//Classe ProdutoFormRequest sendo instanciada para receber os dados do Front-End como parametro. 
}
