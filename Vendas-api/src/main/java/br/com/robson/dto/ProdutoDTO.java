package br.com.robson.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.robson.model.Produto;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object para a criação de um Produto")
public class ProdutoDTO {
	@Schema(description = "Id do Produto", example = "1")
	private Long id;
	@Schema(description = "Descrição", example = "Livro de Java para desenvolvedores iniciantes")
	private String descricao;
	@Schema(description = "Nome do Produto", example = "Livro de Java")
	private String nome;
	@Schema(description = "Preço do Produto", example = "100.00")
	private BigDecimal preco;
	@Schema(description = "SKU do Livro", example = "LBDJ")
	private String sku;	
	
	@JsonFormat(pattern = "dd/MM/yyyy") // para retornar um Json no formato de data especifico.
	@Schema(description = "Data de cadastro do Produto", example = "30/11/2024")
	private LocalDate cadastro;
	
	public ProdutoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ProdutoDTO(Long id, String descricao, String nome, BigDecimal preco, String sku, LocalDate cadastro) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.nome = nome;
		this.preco = preco;
		this.sku = sku;
		this.cadastro = cadastro;
	}

	public Produto toModel() {
		return new Produto(id , nome, descricao, preco, sku);
	}// converter o objeto produto em model
	
	public static ProdutoDTO fromModel(Produto produto) {
		return new ProdutoDTO(
				produto.getId(),
				produto.getDescricao(), 
				produto.getNome(), 
				produto.getPreco(), 
				produto.getSku(), 
				produto.getDataCadastro());
	}
	
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public BigDecimal getPreco() {
		return preco;
	}
	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
	public LocalDate getCadastro() {
		return cadastro;
	}

	public void setCadastro(LocalDate cadastro) {
		this.cadastro = cadastro;
	}

	@Override
	public String toString() {
		return "ProdutoFormRequest [id=" + id + ", descricao=" + descricao + ", nome=" + nome + ", preco=" + preco
				+ ", sku=" + sku + "]";
	}
	

}

