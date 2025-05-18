import React, { useState } from 'react';
import './App.css';
import penta10kg from './penta10kg.png';


function App() {
  // Estado para armazenar produtos selecionados
  const [carrinho, setCarrinho] = useState([]);
  // Estado para armazenar dados do cliente
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    observacoes: ''
  });
  // Estado para controlar visualização do carrinho
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);






  // Produtos disponíveis
  const produtos = [
    {
      id: 1,
      categoria: 'Piscinas',
      itens: [
       
      ]
    },
    {
      id: 2,
      categoria: 'Equipamentos',
      itens: [
        { id: 201, nome: 'Filtro para Piscina 50m³', preco: 1850, imagem: 'https://via.placeholder.com/300x200' },
        { id: 202, nome: 'Bomba 1/2 CV', preco: 980, imagem: 'https://via.placeholder.com/300x200' },
        { id: 203, nome: 'Sistema de Aquecimento Solar', preco: 3500, imagem: 'https://via.placeholder.com/300x200' },
        { id: 204, nome: 'Clorador Automático', preco: 620, imagem: 'https://via.placeholder.com/300x200' }
      ]
    },
    {
      id: 3,
      categoria: 'Acessórios',
      itens: [
        { id: 301, nome: 'Kit Limpeza Completo', preco: 350, imagem: 'https://via.placeholder.com/300x200' },
        { id: 302, nome: 'Escada em Aço Inox', preco: 890, imagem: 'https://via.placeholder.com/300x200' },
        { id: 303, nome: 'Capa Térmica 6x3m', preco: 580, imagem: 'https://via.placeholder.com/300x200' },
        { id: 304, nome: 'Iluminação LED RGB', preco: 720, imagem: 'https://via.placeholder.com/300x200' }
      ]
    },
    {
      id: 4,
      categoria: 'Produtos Químicos',
      itens: [
        { id: 401, nome: 'Cloro Granulado 10kg', preco: 280, imagem: penta10kg },
        { id: 402, nome: 'Algicida Manutenção 1L', preco: 45, imagem: 'https://via.placeholder.com/300x200' },
        { id: 403, nome: 'Clarificante 1L', preco: 38, imagem: 'https://via.placeholder.com/300x200' },
        { id: 404, nome: 'Kit Teste pH e Cloro', preco: 65, imagem: 'https://via.placeholder.com/300x200' }
      ]
    }
  ];

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (item) => {
    const itemNoCarrinho = carrinho.find(prod => prod.id === item.id);
    
    if (itemNoCarrinho) {
      setCarrinho(carrinho.map(prod => 
        prod.id === item.id 
          ? { ...prod, quantidade: prod.quantidade + 1 } 
          : prod
      ));
    } else {
      setCarrinho([...carrinho, { ...item, quantidade: 1 }]);
    }
  };

  // Remover produto do carrinho
  const removerDoCarrinho = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  // Alterar quantidade de um produto
  const alterarQuantidade = (id, quantidade) => {
    if (quantidade < 1) return;
    
    setCarrinho(carrinho.map(item => 
      item.id === id 
        ? { ...item, quantidade: quantidade } 
        : item
    ));
  };

  // Calcular total do pedido
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // Manipular mudanças nos dados do cliente
  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value
    });
  };

  // Formatar preços em reais
  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  // Enviar pedido para WhatsApp
  const enviarPedidoWhatsApp = () => {
    // Número de telefone da loja (substitua pelo número real)
    const numeroWhatsApp = "5514981722063";
    
    // Construir mensagem com o pedido
    let mensagem = `*Pedido - Tomazela Piscinas*\n\n`;
    mensagem += `*Dados do Cliente:*\n`;
    mensagem += `Nome: ${cliente.nome}\n`;
    mensagem += `Telefone: ${cliente.telefone}\n`;
    mensagem += `Endereço: ${cliente.endereco}\n\n`;
    
    mensagem += `*Produtos:*\n`;
    carrinho.forEach(item => {
      mensagem += `- ${item.nome} | Qtd: ${item.quantidade} | Valor: ${formatarPreco(item.preco * item.quantidade)}\n`;
    });
    
    mensagem += `\n*Total do Pedido: ${formatarPreco(calcularTotal())}*\n\n`;
    
    if (cliente.observacoes) {
      mensagem += `*Observações:*\n${cliente.observacoes}\n\n`;
    }
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Criar o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir o link em uma nova janela
    window.open(linkWhatsApp, '_blank');
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header>
        <div className="container header-content">
          <h1 className="logo">Tomazela Piscinas</h1>
          <button 
            onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
            className="cart-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="cart-count">
              {carrinho.reduce((total, item) => total + item.quantidade, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="banner">
        <div className="container">
          <h2>Qualidade e Tradição em Piscinas</h2>
          <p>Os melhores produtos para sua piscina com os melhores preços</p>
          <p>Escolha abaixo os produtos desejados e faça seu pedido pelo WhatsApp</p>
        </div>
      </div>

      <main className="container">
        {/* Janela do Carrinho (Modal) */}
        {mostrarCarrinho && (
          <div className="modal-overlay">
            <div className="modal-conteudo">
              <div className="modal-cabecalho">
                <h3 className="modal-titulo">Seu Carrinho</h3>
                <button 
                  onClick={() => setMostrarCarrinho(false)}
                  className="botao-fechar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {carrinho.length === 0 ? (
                <p className="carrinho-vazio">Seu carrinho está vazio</p>
              ) : (
                <>
                  <div>
                    {carrinho.map(item => (
                      <div key={item.id} className="item-carrinho">
                        <div className="item-info">
                          <img src={item.imagem} alt={item.nome} className="item-imagem" />
                          <div>
                            <h4 className="item-nome">{item.nome}</h4>
                            <p className="item-preco">{formatarPreco(item.preco)}</p>
                          </div>
                        </div>
                        <div className="item-controles">
                          <div className="quantidade-controle">
                            <button 
                              onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                              className="botao-quantidade"
                            >
                              -
                            </button>
                            <span className="quantidade-valor">{item.quantidade}</span>
                            <button 
                              onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                              className="botao-quantidade"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removerDoCarrinho(item.id)}
                            className="botao-remover"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="total-carrinho">
                    <span>Total:</span>
                    <span>{formatarPreco(calcularTotal())}</span>
                  </div>

                  <h3 className="formulario-titulo">Dados para Entrega</h3>
                  <div className="formulario-campos">
                    <div className="campo-grupo">
                      <label className="campo-label">Nome Completo*</label>
                      <input
                        type="text"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleClienteChange}
                        className="campo-input"
                        required
                      />
                    </div>
                    <div className="campo-grupo">
                      <label className="campo-label">Telefone*</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={cliente.telefone}
                        onChange={handleClienteChange}
                        placeholder="(14) 99999-9999"
                        className="campo-input"
                        required
                      />
                    </div>
                    <div className="campo-grupo">
                      <label className="campo-label">Endereço Completo*</label>
                      <input
                        type="text"
                        name="endereco"
                        value={cliente.endereco}
                        onChange={handleClienteChange}
                        className="campo-input"
                        required
                      />
                    </div>
                    <div className="campo-grupo">
                      <label className="campo-label">Observações</label>
                      <textarea
                        name="observacoes"
                        value={cliente.observacoes}
                        onChange={handleClienteChange}
                        className="campo-textarea"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    onClick={enviarPedidoWhatsApp}
                    disabled={!cliente.nome || !cliente.telefone || !cliente.endereco}
                    className={`botao-finalizar ${
                      !cliente.nome || !cliente.telefone || !cliente.endereco 
                        ? 'botao-finalizar-inativo' 
                        : 'botao-finalizar-ativo'
                    }`}
                  >
                    Finalizar Pedido via WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Conteúdo Principal - Produtos por Categoria */}
        <div>
          {produtos.map(categoria => (
            <div key={categoria.id} className="categoria">
              <h2 className="categoria-titulo">{categoria.categoria}</h2>
              <div className="produtos-grid">
                {categoria.itens.map(item => (
                  <div key={item.id} className="produto">
                    <img src={item.imagem} alt={item.nome} className="produto-imagem" />
                    <div className="produto-info">
                      <h3 className="produto-nome">{item.nome}</h3>
                      <p className="produto-preco">{formatarPreco(item.preco)}</p>
                      <button 
                        onClick={() => adicionarAoCarrinho(item)}
                        className="botao-adicionar"
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer>
        <div className="container">
          <div className="rodape-grid">
            <div className="rodape-secao">
              <h3 className="rodape-titulo">Tomazela Piscinas</h3>
              <p>Mais de 15 anos trazendo qualidade e inovação para sua piscina.</p>
            </div>
            <div className="rodape-secao">
              <h3 className="rodape-titulo">Contato</h3>
              <p className="rodape-info">Telefone: (14) 98172-2063</p>
              <p className="rodape-info">Email: contato@tomazelapiscinas.com.br</p>
              <p>Endereço: Rua Romualdo Albino Balestrin, 35 - Conchas, SP</p>
            </div>
            <div className="rodape-secao">
              <h3 className="rodape-titulo">Horário de Funcionamento</h3>
              <p className="rodape-info">Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 12h</p>
            </div>
          </div>
          <div className="rodape-copyright">
            <p>&copy; {new Date().getFullYear()} Tomazela Piscinas - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
