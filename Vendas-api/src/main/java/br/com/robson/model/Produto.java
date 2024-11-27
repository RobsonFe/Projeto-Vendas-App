package br.com.robson.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity // Marca a classe como uma entidade
@Table (name = "produto"/*Poderia ser tb_produto*/) // é opcionial, só é obrigatorio quando o nome da classe é diferente do nome da tabela.
public class Produto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", length = 100)
	private String nome;
	
	@Column(name ="descricao", length = 255)
	private String descricao;
	
	@Column(name ="preco", precision = 16 , scale = 2)
	private BigDecimal preco;
	
	@Column
	private String sku;
	
	@Column (name = "data_cadastro")
	private LocalDate dataCadastro;
	
	public Produto() {
		super();
	}
	
	public Produto(String nome, String descricao, BigDecimal preco, String sku) {
		super();
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.sku = sku;
	}

	

	public Produto(Long id, String nome, String descricao, BigDecimal preco, String sku) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.sku = sku;
	}
	
	@PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	} // Esse metodo faz o seguinte, antes de persistir(salvar o dado) ele irá pegar a data atual.

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Produto produto = (Produto) o;
		return Objects.equals(id, produto.id) && Objects.equals(nome, produto.nome) && Objects.equals(descricao, produto.descricao) && Objects.equals(preco, produto.preco) && Objects.equals(sku, produto.sku) && Objects.equals(dataCadastro, produto.dataCadastro);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, nome, descricao, preco, sku, dataCadastro);
	}

	@Override
	public String toString() {
		return "Produto [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", preco=" + preco + ", sku=" + sku
				+ "]";
	}

	
	
	
}
