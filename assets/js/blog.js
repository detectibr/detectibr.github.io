// ============ BLOG COM INDEX.JSON ============

// Função para carregar os posts a partir do index.json
async function loadPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    try {
        // Carrega a lista de posts do index.json
        const response = await fetch('_posts/index.json');
        if (!response.ok) throw new Error('Arquivo index.json não encontrado');
        const posts = await response.json();

        // Para cada post, carrega o conteúdo do arquivo .md
        const postsWithContent = await Promise.all(
            posts.map(async (post) => {
                try {
                    const mdResponse = await fetch(`_posts/${post.slug}.md`);
                    if (!mdResponse.ok) throw new Error('Arquivo .md não encontrado');
                    const markdown = await mdResponse.text();
                    
                    // Converte Markdown para HTML
                    const htmlContent = marked.parse(markdown);
                    
                    return {
                        ...post,
                        content: htmlContent
                    };
                } catch (error) {
                    console.error(`Erro ao carregar ${post.slug}:`, error);
                    return {
                        ...post,
                        content: '<p>Conteúdo indisponível.</p>'
                    };
                }
            })
        );

        renderPosts(postsWithContent);

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        container.innerHTML = `
            <div class="no-posts">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Erro ao carregar os artigos. Tente novamente mais tarde.</p>
                <p style="font-size: 13px; margin-top: 8px; color: #666;">Verifique se o arquivo _posts/index.json existe.</p>
            </div>
        `;
    }
}

// Função para renderizar os posts na tela
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
                        <span><i class="fa-regular fa-clock"></i> 5 min de leitura</span>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = `<div class="blog-grid">${postsHTML}</div>`;
}

// ============ FUNÇÃO PARA POST INDIVIDUAL ============

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
        // Carrega a lista de posts do index.json
        const response = await fetch('_posts/index.json');
        if (!response.ok) throw new Error('Arquivo index.json não encontrado');
        const posts = await response.json();

        // Encontra o post pelo slug
        const postMeta = posts.find(p => p.slug === slug);
        if (!postMeta) {
            throw new Error('Post não encontrado');
        }

        // Carrega o conteúdo do arquivo .md
        const mdResponse = await fetch(`_posts/${slug}.md`);
        if (!mdResponse.ok) throw new Error('Arquivo .md não encontrado');
        const markdown = await mdResponse.text();

        // Converte Markdown para HTML
        const htmlContent = marked.parse(markdown);

        const dateObj = new Date(postMeta.date);
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const tagsHTML = postMeta.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        container.innerHTML = `
            <article class="post-content animate__animated animate__fadeInUp">
                <div class="post-header">
                    <h1 style="font-size: 38px; color: #ffffff; margin-bottom: 12px;">${postMeta.title}</h1>
                    <div class="post-tags" style="margin: 16px 0;">${tagsHTML}</div>
                    <div class="post-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="fa-regular fa-clock"></i> 5 min de leitura</span>
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
                <p style="font-size: 14px; margin-top: 8px; color: #666;">Slug: ${slug}</p>
                <a href="/blog.html" style="display: inline-block; margin-top: 20px; color: #8C52FF; text-decoration: none;">
                    <i class="fa-solid fa-arrow-left"></i> Voltar para o blog
                </a>
            </div>
        `;
    }
}
