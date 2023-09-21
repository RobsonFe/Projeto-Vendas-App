package br.com.robson.rest.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.robson.model.Produto;
import br.com.robson.model.repository.ProdutoRepository;

@RestController // Controlador da operação
@RequestMapping("/api/produtos") // Request para localizar o mapeamento da pagina/ a rota.
public class ProdutoController {
	
		@Autowired  //Faz a instancia da classe.
		private ProdutoRepository repository;
		
		@PostMapping // recebenfdo o metodo post de uma requisição
		public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto) {
			
			Produto entidadeProduto = new Produto(produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getSku());
			
			repository.save(entidadeProduto);
			
			System.out.println(entidadeProduto);
			return produto;
			
		} // RequestBody convertendo um arquivo Json em String vindo do corpo da requisição. 
		//Classe ProdutoFormRequest sendo instanciada para receber os dados do Front-End como parametro. 
}
