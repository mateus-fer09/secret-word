# Secret Word - Jogo da Palavra Secreta

Este é um projeto desenvolvido em ReactJS, onde o objetivo é adivinhar a palavra secreta a partir de dicas de categoria e tentativas de letras. O projeto foi criado como parte de um curso de ReactJS e serve como uma ótima demonstração de conceitos fundamentais da biblioteca.

## Demonstração

> (Adicione aqui um print do jogo ou um link para deploy, se houver)

## Funcionalidades

- Sorteio aleatório de palavras e categorias
- Sistema de tentativas e pontuação
- Renderização condicional de telas (início, jogo, fim de jogo)
- Feedback visual para letras corretas e incorretas
- Reinício automático ao acertar a palavra ou perder todas as tentativas

## Conceitos de ReactJS Utilizados

### 1. **Componentização**
O projeto é dividido em vários componentes reutilizáveis, como:
- `App`: componente principal que gerencia o estado global do jogo.
- `StartScreen`: tela inicial.
- `Game`: lógica e interface do jogo.
- `GameOver`: tela de fim de jogo.

### 2. **Props**
A comunicação entre componentes é feita através de props, permitindo o envio de dados e funções de um componente pai para seus filhos.

### 3. **State (useState)**
O gerenciamento de estados locais é feito com o hook `useState`, controlando:
- Palavra sorteada
- Categoria
- Letras acertadas e erradas
- Tentativas restantes
- Pontuação

### 4. **Hooks (useEffect, useCallback, useRef)**
- `useEffect`: utilizado para monitorar mudanças de estado e executar efeitos colaterais, como verificar vitória ou derrota.
- `useCallback`: otimiza funções para evitar recriações desnecessárias.
- `useRef`: utilizado para manipular o foco do input após cada tentativa.

### 5. **Renderização Condicional**
O React renderiza diferentes componentes/telas de acordo com o estágio do jogo (`start`, `game`, `end`).

### 6. **Manipulação de Eventos**
Eventos de formulário e botões são tratados para capturar tentativas do usuário e controlar o fluxo do jogo.

### 7. **Estilização**
O projeto utiliza CSS modularizado para estilizar os componentes, garantindo uma interface agradável e responsiva.

## Como rodar o projeto

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse `http://localhost:5173` no seu navegador.

## Tecnologias Utilizadas

- ReactJS
- Vite
- JavaScript (ES6+)
- CSS

---

Sinta-se à vontade para personalizar este README com seu nome, prints do projeto ou links para o deploy!
