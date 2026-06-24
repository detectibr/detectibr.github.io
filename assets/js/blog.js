// ============ BLOG DINÂMICO ============
// NÃO precisa mais atualizar este arquivo!
// Ele escaneia automaticamente a pasta _posts/

// ============ FUNÇÃO PARA BUSCAR TODOS OS POSTS ============

// Essa função tenta encontrar todos os arquivos .md na pasta _posts/
// Você precisa manter a lista de arquivos atualizada, OU usar uma abordagem diferente

// OPÇÃO 1: Lista de arquivos (ainda precisa atualizar, mas só a lista)
// const postFiles = [
//     '_posts/introducao-pentest.md',
//     '_posts/ferramentas-nmap.md',
//     // adicione novos posts aqui
// ];

// OPÇÃO 2: Usar um arquivo index.json (RECOMENDADO)
// Você cria um arquivo _posts/index.json com a lista de posts
// E atualiza ele quando criar um novo post

// OPÇÃO 3: Usar a API do GitHub para listar arquivos (MAIS DINÂMICO)
// O blog.js consulta a API do GitHub para listar os arquivos da pasta _posts/

// ============ IMPLEMENTAÇÃO COM GITHUB API (MAIS DINÂMICA) ============

// Configuração do repositório
const REPO_OWNER = 'detectibr'; // Seu usuário do GitHub
const REPO_NAME = 'detectibr.github.io'; // Nome do repositório
const POSTS_PATH = '_posts'; // Pasta onde ficam os posts

// Função para buscar a lista de posts via API do GitHub
async function fetchPostList() {
    try {
        // Busca a lista de arquivos na pasta _posts via API do GitHub
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${POSTS_PATH}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar lista de posts: ${response.status}`);
        }
        
        const files = await response.json();
        
        // Filtra apenas arquivos .md
        const mdFiles = files.filter(file => 
            file.name.endsWith('.md') && 
            file.type === 'file'
        );
        
        return mdFiles;
    } catch (error) {
        console.error('Erro ao buscar lista de posts:', error);
        return [];
    }
}

// Função para extrair metadados de um arquivo Markdown
function parseMarkdownMetadata(markdown) {
    const metadata = {
        title: '',
        date: '',
        tags: [],
        excerpt: '',
        slug: '',
        readTime: '5 min de leitura'
    };

    // Tenta encontrar Front Matter (--- ... ---)
    const frontMatterMatch = markdown.match(/^---\s*([\s\S]*?)\s*---/);
    
    if (frontMatterMatch) {
        const frontMatter = frontMatterMatch[1];
        
        // Extrai título
        const titleMatch = frontMatter.match(/title:\s*(.+)/);
        if (titleMatch) metadata.title = titleMatch[1].trim();
        
        // Extrai data
        const dateMatch = frontMatter.match(/date:\s*(.+)/);
        if (dateMatch) metadata.date = dateMatch[1].trim();
        
        // Extrai tags
        const tagsMatch = frontMatter.match(/tags:\s*\[(.*?)\]/);
        if (tagsMatch) {
            metadata.tags = tagsMatch[1].split(',').map(t => t.trim());
        }
        
        // Extrai excerpt/resumo
        const excerptMatch = frontMatter.match(/excerpt:\s*(.+)/);
        if (excerptMatch) metadata.excerpt = excerptMatch[1].trim();
    }

    // Se não tiver Front Matter, tenta extrair do conteúdo
    if (!metadata.title) {
        const titleMatch = markdown.match(/^#\s+(.+)/m);
        if (titleMatch) metadata.title = titleMatch[1].trim();
    }

    // Extrai o primeiro parágrafo como excerpt se não tiver
    if (!metadata.excerpt) {
        const content = markdown.replace(/^---\s*[\s\S]*?---/, '');
        const firstP = content.match(/(?:\n|^)(.+?)(?:\n\n|$)/);
        if (firstP) {
            const cleanText = firstP[1].replace(/#+\s/g, '').trim();
            metadata.excerpt = cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
        }
    }

    return metadata;
}

// Função para estimar tempo de leitura
function calculateReadTime(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes <= 1 ? '1 min de leitura' : `${minutes} min de leitura`;
}

// ============ FUNÇÃO PARA CARREGAR POSTS DINAMICAMENTE ============

async function loadPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    try {
        // Busca a lista de arquivos
        const files = await fetchPostList();
        
        if (files.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <i class="fa-solid fa-book-open"></i>
                    <p>Nenhum artigo publicado ainda. Volte em breve!</p>
                </div>
            `;
            return;
        }

        // Carrega o conteúdo de cada arquivo
        const postsData = await Promise.all(
            files.map(async (file) => {
                try {
                    const response = await fetch(file.download_url);
                    if (!response.ok) throw new Error('Erro ao baixar arquivo');
                    const markdown = await response.text();
                    
                    const metadata = parseMarkdownMetadata(markdown);
                    const readTime = calculateReadTime(markdown);
                    
                    // Gera o slug a partir do nome do arquivo
                    const slug = file.name.replace('.md', '');
                    
                    return {
                        slug: slug,
                        title: metadata.title || slug.replace(/-/g, ' '),
                        date: metadata.date || file.name.substring(0, 10),
                        tags: metadata.tags || ['Segurança'],
                        excerpt: metadata.excerpt || 'Clique para ler o artigo completo.',
                        readTime: readTime,
                        file: file.download_url,
                        filename: file.name
                    };
                } catch (error) {
                    console.error(`Erro ao carregar ${file.name}:`, error);
                    return null;
                }
            })
        );

        // Filtra posts que não carregaram
        const validPosts = postsData.filter(p => p !== null);
        
        // Ordena por data (mais recente primeiro)
        validPosts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        renderPosts(validPosts);

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        container.innerHTML = `
            <div class="no-posts">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Erro ao carregar os artigos. Tente novamente mais tarde.</p>
                <p style="font-size: 13px; margin-top: 8px; color: #666;">Verifique se o repositório está configurado corretamente.</p>
            </div>
        `;
    }
}

// ============ FUNÇÃO PARA RENDERIZAR POSTS ============

function renderPosts(postsData) {
    const container = document.getElementById('posts-container');
    if (!container) return;

    if (!postsData || postsData.length === 0) {
        container.innerHTML = `
            <div class="no-posts">
                <i class="fa-solid fa-book-open"></i>
                <p>Nenhum artigo publicado ainda. Volte em breve!</p>
            </div>
        `;
        return;
    }

    const postsHTML = postsData.map(post => {
        const dateObj = new Date(post.date);
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const tagsHTML = post.tags.map(tag => 
            `<span class="post-tag">${tag}</span>`
        ).join('');

        return `
            <a href="/post.html?slug=${post.slug}" class="blog-card animate__animated animate__fadeInUp">
                <div>
                    <div class="post-tags">${tagsHTML}</div>
                    <h3>${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = `<div class="blog-grid">${postsHTML}</div>`;
}

// ============ FUNÇÃO PARA CARREGAR POST INDIVIDUAL ============

async function loadPost() {
    const container = document.getElementById('post-container');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        container.innerHTML = `
            <div class="post-error">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>Nenhum artigo especificado.</p>
                <a href="/blog.html"><i class="fa-solid fa-arrow-left"></i> Voltar para o blog</a>
            </div>
        `;
        return;
    }

    try {
        // Busca a lista de arquivos para encontrar o post correto
        const files = await fetchPostList();
        const file = files.find(f => f.name === `${slug}.md`);

        if (!file) {
            throw new Error('Post não encontrado');
        }

        const response = await fetch(file.download_url);
        if (!response.ok) throw new Error('Erro ao baixar arquivo');
        const markdown = await response.text();

        const metadata = parseMarkdownMetadata(markdown);
        const readTime = calculateReadTime(markdown);

        // Converte Markdown para HTML (usando marked.js)
        const htmlContent = marked.parse(markdown);

        const dateObj = new Date(metadata.date || file.name.substring(0, 10));
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const tagsHTML = (metadata.tags || ['Segurança']).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        container.innerHTML = `
            <article class="post-content animate__animated animate__fadeInUp">
                <div class="post-header">
                    <h1 style="font-size: 38px; color: #ffffff; margin-bottom: 12px;">${metadata.title || slug.replace(/-/g, ' ')}</h1>
                    <div class="post-tags" style="margin: 16px 0;">${tagsHTML}</div>
                    <div class="post-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="fa-regular fa-clock"></i> ${readTime}</span>
                    </div>
                </div>
                <div class="post-body">
                    ${htmlContent}
                </div>
                <a href="/blog.html" class="back-link">
                    <i class="fa-solid fa-arrow-left"></i> Voltar para o blog
                </a>
            </article>
        `;

        // Aplica syntax highlighting se disponível
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }

    } catch (error) {
        console.error('Erro ao carregar o post:', error);
        container.innerHTML = `
            <div class="post-error">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Erro ao carregar o artigo. Tente novamente mais tarde.</p>
                <a href="/blog.html" style="display: inline-block; margin-top: 20px; color: #8C52FF; text-decoration: none;">
                    <i class="fa-solid fa-arrow-left"></i> Voltar para o blog
                </a>
            </div>
        `;
    }
}
