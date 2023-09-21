package br.com.robson.rest.produto;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Controlador da operação
@RequestMapping("/api/produtos") // Request para localizar o mapeamento da pagina/ a rota.
public class ProdutoController {
		
		@PostMapping // recebenfdo o metodo post de uma requisição
		public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto) {
			System.out.println(produto);
			return produto;
			
		} // RequestBody convertendo um arquivo Json em String vindo do corpo da requisição. 
		//Classe ProdutoFormRequest sendo instanciada para receber os dados do Front-End como parametro. 
}
