const cardDetalhes = document.querySelector<HTMLDivElement>('#cardDetalhes')!;
const fecharCard = document.querySelector<HTMLDivElement>('#fecharCard')!;
const imgDetalhe = cardDetalhes.querySelector<HTMLImageElement>('img')!;
const tituloDetalhe = cardDetalhes.querySelector<HTMLHeadingElement>('.titulo-produto')!;
const descricaoDetalhe = cardDetalhes.querySelector<HTMLParagraphElement>('.descricao-produto')!;
const categoriaDetalhe = cardDetalhes.querySelector<HTMLParagraphElement>('.categoria-produto')!;
const precoDetalhe = cardDetalhes.querySelector<HTMLParagraphElement>('.preco-produto')!;

interface Produto {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
}

const loadProdutos = async (): Promise<void> => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const produtos: Produto[] = await response.json();

        const container = document.querySelector<HTMLDivElement>('#produtos')!;

        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.className = 'produto';

            const icon = document.createElement('i');
            icon.className = 'fa fa-search';
            icon.onclick = () => exibirDetalhe(produto);

            const infosDiv = document.createElement('div');
            infosDiv.className = 'infos';

            const img = document.createElement('img');
            img.src = produto.image;
            img.alt = produto.title;

            const titulo = document.createElement('h3');
            titulo.className = 'titulo-produto';
            titulo.textContent = produto.title;

            const preco = document.createElement('p');
            preco.className = 'preco-produto';
            preco.textContent = `$${produto.price.toFixed(2)}`;

            infosDiv.appendChild(img);
            infosDiv.appendChild(titulo);
            infosDiv.appendChild(preco);
            produtoDiv.appendChild(icon);
            produtoDiv.appendChild(infosDiv);
            container.appendChild(produtoDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
};

const exibirDetalhe = (produto: Produto): void => {
    imgDetalhe.src = produto.image;
    imgDetalhe.alt = produto.title;
    tituloDetalhe.textContent = produto.title;
    descricaoDetalhe.textContent = produto.description;
    categoriaDetalhe.textContent = produto.category;
    precoDetalhe.textContent = `$${produto.price.toFixed(2)}`;
    cardDetalhes.classList.remove('hidden');
};

const fecharCardDetalhe = (): void => {
    cardDetalhes.classList.add('hidden');
};

fecharCard.onclick = fecharCardDetalhe;
loadProdutos();
