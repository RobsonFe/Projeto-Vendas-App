package br.com.robson.controller;

import br.com.robson.dto.ProdutoDTO;
import br.com.robson.model.Produto;
import br.com.robson.repository.ProdutoRepository;
import br.com.robson.service.ProdutoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProdutoControllerTest {

    @Mock
    private ProdutoService produtoService;

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoController produtoController;
    private ProdutoDTO produtoDTO;
    private Produto produto;

    @BeforeEach
    void setUp() {
        produtoDTO = new ProdutoDTO();
        produtoDTO.setNome("PC Gamer");
        produtoDTO.setDescricao("PC Gamer com placa de vídeo RTX 3080");
        produtoDTO.setPreco(new BigDecimal(8000.00));
        produtoDTO.setSku("SKU-123");

        produto = produtoDTO.toModel();

        produto.setId(1L);

    }

    @Test
    void testSalvarProduto() {
        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);
        when(produtoService.salvar(any(ProdutoDTO.class))).thenAnswer(invocation -> {
            ProdutoDTO dto = invocation.getArgument(0);
            Produto produto = new Produto();
            produto.setNome(dto.getNome());
            produto.setDescricao(dto.getDescricao());
            produto.setPreco(dto.getPreco());
            produto.setSku(dto.getSku());
            return produtoRepository.save(produto);
        });

        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("PC Gamer");
        produto.setDescricao("PC Gamer com placa de vídeo RTX 3080");
        produto.setPreco(new BigDecimal(8000.00));
        produto.setSku("SKU-123");

        ResponseEntity<ProdutoDTO> response = produtoController.salvar(produtoDTO);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(produto, response.getBody().toModel());

        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void testListarProdutos() {
        when(produtoService.listar(0, 10)).thenReturn(null);

        ResponseEntity response = produtoController.listarProdutos(0, 10);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(produtoService, times(1)).listar(0, 10);
    }

    @Test
    void testBuscarPorId() {
        when(produtoService.buscarPorId(1L)).thenReturn(produtoDTO);

        ResponseEntity response = produtoController.buscarPorId(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(produtoService, times(1)).buscarPorId(1L);
    }

    @Test
    void testBuscarPorNome() {
        when(produtoService.buscarPorNome("PC Gamer")).thenReturn(null);

        ResponseEntity response = produtoController.buscarPorNome("PC Gamer");

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(produtoService, times(1)).buscarPorNome("PC Gamer");
    }

    @Test
    void testAtualizarProduto() {
        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);
        when(produtoService.atualizar(any(Produto.class))).thenReturn(produto);

        ResponseEntity<Void> response = produtoController.atualizar(produto.getId(), produto);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void testDeletarProduto() {
        ResponseEntity<Void> response = produtoController.remover(produto.getId());

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());

        verify(produtoService, times(1)).deletar(produto.getId());
    }
}
