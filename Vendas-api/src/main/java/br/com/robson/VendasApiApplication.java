package br.com.robson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class VendasApiApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(VendasApiApplication.class, args);
		System.out.println("Autor da API: Robson Ferreira");
		System.out.println("Acesse a API no Link http://localhost:8080/swagger-ui/index.html");
		
	}

}
