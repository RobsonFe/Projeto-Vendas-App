package br.com.robson.service;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.model.Produto;
import br.com.robson.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    private ProdutoDTO produtoDTO;
    private Produto produto;

    @BeforeEach
    void setUp(){
        // Definindo os dados para o DTO e o Modelo
        produtoDTO = new ProdutoDTO();
        produtoDTO.setId(1L);
        produtoDTO.setNome("PC Gamer");
        produtoDTO.setDescricao("PC Gamer com placa de vídeo RTX 3080");
        produtoDTO.setPreco(new BigDecimal("8000.00"));
        produtoDTO.setSku("SKU-123");

        produto = produtoDTO.toModel(); // Convertendo o DTO para o Modelo Produto
    }

    @Test
    void testSalvarProduto() {
        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);

        Produto produtoSalvo = produtoService.salvar(produtoDTO);

        assertNotNull(produtoSalvo);
        assertEquals(produto.getNome(), produtoSalvo.getNome());
        assertEquals(produto.getDescricao(), produtoSalvo.getDescricao());
        assertEquals(produto.getPreco(), produtoSalvo.getPreco());
        assertEquals(produto.getSku(), produtoSalvo.getSku());

        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void testSalvarProdutoSemNome(){
        produtoDTO.setNome(null);
        assertThrows(IllegalArgumentException.class, () -> produtoService.salvar(produtoDTO));
    }

    @Test
    void testSalvarProdutoSemDescricao(){
        produtoDTO.setDescricao(null);
        assertThrows(IllegalArgumentException.class, () -> produtoService.salvar(produtoDTO));
    }

    @Test
    void testSalvarProdutoSemPreco(){
        produtoDTO.setPreco(null);
        assertThrows(IllegalArgumentException.class, () -> produtoService.salvar(produtoDTO));
    }

    @Test
    void testSalvarProdutoSemSku(){
        produtoDTO.setSku(null);
        assertThrows(IllegalArgumentException.class, () -> produtoService.salvar(produtoDTO));
    }

    @Test
    void testSalvarProdutoSemNomeDescricaoPrecoSku(){
        produtoDTO.setNome(null);
        produtoDTO.setDescricao(null);
        produtoDTO.setPreco(null);
        produtoDTO.setSku(null);
        assertThrows(IllegalArgumentException.class, () -> produtoService.salvar(produtoDTO));
    }

    @Test
    void testBuscarPorId(){
        when(produtoRepository.findById(anyLong())).thenReturn(Optional.of(produto));

        ProdutoDTO produtoDTO = produtoService.buscarPorId(1L);

        assertNotNull(produtoDTO);
        assertEquals(produto.getNome(), produtoDTO.getNome());
        assertEquals(produto.getDescricao(), produtoDTO.getDescricao());
        assertEquals(produto.getPreco(), produtoDTO.getPreco());
        assertEquals(produto.getSku(), produtoDTO.getSku());

        verify(produtoRepository, times(1)).findById(anyLong());
    }

    @Test
    void testBuscarPorIdProdutoNaoEncontrado(){
        when(produtoRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> produtoService.buscarPorId(1L));
    }

    @Test
    void testAtualizarProduto(){
        produtoDTO.setId(1L);

        when(produtoRepository.findById(produtoDTO.getId())).thenReturn(Optional.of(produto));
        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);

        Produto produtoAtualizado = produtoService.atualizar(produtoDTO.toModel());

        assertNotNull(produtoAtualizado);
        assertEquals(produto.getNome(), produtoAtualizado.getNome());
        assertEquals(produto.getDescricao(), produtoAtualizado.getDescricao());
        assertEquals(produto.getPreco(), produtoAtualizado.getPreco());
        assertEquals(produto.getSku(), produtoAtualizado.getSku());

        verify(produtoRepository, times(1)).findById(anyLong());
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void testNaoAtualizarProdutoNaoEncontrado(){
        produtoDTO.setId(1L);

        when(produtoRepository.findById(produtoDTO.getId())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> produtoService.atualizar(produtoDTO.toModel()));
    }

    @Test
    void testDeletarProduto(){
        when(produtoRepository.findById(produto.getId())).thenReturn(Optional.of(produto));

        Produto produtoDeletado = produtoService.deletar(produto.getId());

        assertNotNull(produtoDeletado);
        assertEquals(produto, produtoDeletado);

        verify(produtoRepository, times(1)).findById(produto.getId());
        verify(produtoRepository, times(1)).delete(produto);
    }


    @Test
    void testListarProdutos() {

        Produto produto1 = new Produto(1L, "Produto 1", "Descrição 1", new BigDecimal("100.00"), "SKU-001");
        Produto produto2 = new Produto(2L, "Produto 2", "Descrição 2", new BigDecimal("200.00"), "SKU-002");

        // Criando uma página com os produtos mockados
        Pageable pageable = PageRequest.of(0, 10, Sort.by("nome").ascending());
        Page<Produto> page = new PageImpl<>(Arrays.asList(produto1, produto2), pageable, 2);

        // Simulando o comportamento do findAll
        when(produtoRepository.findAll(pageable)).thenReturn(page);

        // Chamada do método a ser testado
        Page<ProdutoDTO> produtoDTOPage = produtoService.listar(0, 10);

        // Verificando se a página não está vazia
        assertNotNull(produtoDTOPage);
        assertEquals(2, produtoDTOPage.getContent().size());

        // Validando os dados dos produtos na página
        ProdutoDTO produtoDTO1 = produtoDTOPage.getContent().get(0);
        ProdutoDTO produtoDTO2 = produtoDTOPage.getContent().get(1);

        assertEquals("Produto 1", produtoDTO1.getNome());
        assertEquals("Produto 2", produtoDTO2.getNome());

        // Verificando que o método findAll foi chamado com o Pageable correto
        verify(produtoRepository, times(1)).findAll(pageable);
    }
}
