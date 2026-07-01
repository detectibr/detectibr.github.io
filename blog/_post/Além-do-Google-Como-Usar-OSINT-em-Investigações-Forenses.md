# Além do Google: Como Usar OSINT em Investigações Forenses Sem Comprometer a Validade Jurídica

Você já parou para pensar em quanta informação sobre pessoas, empresas e infraestruturas está flutuando livremente pela internet neste exato momento? No universo da segurança digital e da computação forense, essa mina de ouro tem nome: **OSINT (Open Source Intelligence)**, ou Inteligência de Fontes Abertas.

Mas aqui está o grande divisor de águas entre um curioso da internet e um profissional de perícia forense ou Red Teaming: **como coletar esses dados públicos de forma que eles realmente sirvam como prova admissível em um tribunal ou relatório oficial?**

Se você acha que fazer OSINT é apenas digitar um nome no Google, este artigo vai expandir seus horizontes. Vamos explorar as principais técnicas de coleta e, mais importante, as estratégias para garantir a **integridade** e **admissibilidade** dessas evidências.

---

## O que é Inteligência (de verdade) na Era Digital?

Para a Ciência da Informação, existe uma diferença crucial entre **dado bruto** e **inteligência**. Pense em uma pirâmide informacional: na base, temos dados desconexos; no topo, o conhecimento reflexivo.

![alt text](https://raw.githubusercontent.com/detectibr/detectibr.github.io/refs/heads/main/assets/images/piramide-informacional.png)

> _"Inteligência é toda informação coletada, organizada ou analisada para entender as demandas de um tomador de decisões qualquer."_ – Marco Cepik

No contexto investigativo, a **Doutrina Nacional de Inteligência de Segurança Pública (DNISP)** classifica as fontes em três grandes pilares:

1. **HUMINT (Human Intelligence):** Informações obtidas diretamente de pessoas.
    
2. **TECHINT (Technical Intelligence):** Dados coletados por meios puramente técnicos e equipamentos especializados (como Sigint e Geoint).
    
3. **OSINT (Open Source Intelligence):** Produção de conhecimento baseada em dados públicos e de livre acesso.
    
---

## O Arsenal do Investigador: Técnicas Práticas de Coleta

Muitos acham que OSINT é algo complexo e distante, mas a verdade é que realizar uma busca refinada para entender o melhor custo-benefício de um produto já é uma aplicação primitiva do conceito. Porém, profissionalmente, o buraco é mais embaixo. Destacamos três vertentes fundamentais de coleta:

### 1. Fontes Oficiais e Governamentais

O governo é o maior centralizador de dados de uma sociedade. Para investigações corporativas ou de fraudes no Brasil, portais oficiais como a **Receita Federal**, a **Procuradoria Geral da Fazenda Nacional (PGFN)** e o **Portal da Transparência** são paradas obrigatórias.

- **Aplicação Prática:** A emissão de uma Certidão Negativa de Débitos ou a consulta da Situação Cadastral de Pessoa Jurídica permite cruzar CPFs/CNPJs, validar nomes completos de forma legítima e estruturar o organograma de fraudes de forma incontestável.
    

### 2. SOCMINT (Social Media Intelligence)

As redes sociais mapeiam rotinas, relacionamentos, conexões corporativas e hábitos. Dentro da OSINT, essa análise focada em redes sociais é chamada de **SOCMINT**.

- **Correlação de Usernames:** Investigados costumam repetir os mesmos "arrobas" em diferentes plataformas. Ferramentas automatizadas como o _WhatsMyName Web_ permitem varrer mais de 200 plataformas simultaneamente para encontrar perfis associados ao mesmo nome de usuário.
    
- **Mapeamento Corporativo no LinkedIn:** Excelente para engenharia social e análise de superfície de ataque (Recon). Permite desenhar a estrutura interna de uma empresa, descobrir quem ocupa cargos críticos e coletar e-mails institucionais legítimos.
    

### 3. Operadores Avançados de Busca (Google Dorks)

O Google possui _web crawlers_ (rastreadores) que indexam quase tudo na internet pública. Para não se perder em milhões de resultados inúteis, analistas forenses utilizam comandos avançados, as famosas **Google Dorks**:

| **Operador** | **Função**                                                                | **Exemplo Prático**                |
| ------------ | ------------------------------------------------------------------------- | ---------------------------------- |
| `site:`      | Restringe a busca a um domínio específico.                                | `site:gov.br`                      |
| `filetype:`  | Busca por extensões de arquivos específicas (útil para achar vazamentos). | `filetype:pdf`                     |
| `intitle:`   | Filtra termos que aparecem estritamente no título da página.              | `intitle:"relatório confidencial"` |
| `inurl:`     | Retorna páginas que contenham o termo diretamente na URL.                 | `inurl:admin/login`                |

**Super Dork (Combinação):**

Plaintext

```
site:alvo.com.br filetype:xlsx intext:CPF
```

_O que isso faz?_ Filtra planilhas Excel indexadas dentro do site do alvo que contenham a palavra "CPF" no texto, expondo potenciais incidentes de vazamento de dados.

---

## O Grande Desafio Forense: A Fragilidade da Prova Digital

Coletar a informação é apenas metade do caminho. No ambiente digital, lidamos com **bits** — elementos intangíveis, voláteis e facilmente mutáveis. Se você simplesmente tirar um _print screen_ de uma tela, essa imagem poderá ser facilmente contestada pela defesa em juízo sob a alegação de adulteração (como um simples "Inspecionar Elemento" no navegador).

O Código de Processo Civil brasileiro (Art. 369) deixa claro que as provas precisam ser legal e moralmente legítimas. Para arquivos eletrônicos, **o documento original é o digital**; qualquer impressão é mera cópia.

---

### Como Garantir a Admissibilidade Jurídica?

Para que uma evidência coletada via OSINT não seja descartada pelo juiz, o investigador precisa seguir protocolos internacionais de preservação, como a **ISO/IEC 27037** (diretrizes para identificação, coleta, aquisição e preservação de evidências digitais).

1. **Uso de Ferramentas Certificadas:** Plataformas especializadas em isolamento de contexto (como a _Verifact_) registram a coleta gerando metadados técnicos, logs de auditoria e espelhamento técnico do ambiente, impedindo fraudes no momento do registro.
    
2. **Cadeia de Custódia:** É preciso documentar cronologicamente toda a história da evidência: quem coletou, quando, como e onde.
    
3. **Cálculo de Hash (Integridade):** Gerar a assinatura digital (MD5, SHA-256) do arquivo no exato momento da coleta garante que, se um único bit for alterado no futuro, o tribunal saberá que a prova foi violada.
    
---

## Conclusão

A Inteligência de Fontes Abertas é uma disciplina poderosa que entrega cerca de **95% do que precisamos saber** em uma investigação se aplicada com critério e competência. No entanto, a linha que separa uma informação útil de uma prova jurídica aceitável é o **rigor metodológico** na preservação da integridade.

Como profissionais de tecnologia e segurança, nosso papel é garantir que a verdade factual coletada na internet seja blindada contra contestações técnicas e jurídicas.

---

## Quer se aprofundar no estudo completo?

Este artigo é um resumo da pesquisa acadêmica que teve como objetivo avaliar a aplicabilidade de informações provenientes de fontes abertas (OSINT) em processos judiciais. Desenvolvido como requisito parcial para a conclusão da especialização em Computação Forense e Segurança da Informação. Para conferir toda a fundamentação legal, análise profunda de ferramentas forenses e a bibliografia completa, você pode ler o material na íntegra.

👉 **[Link para o PDF Completo do TCC](https://lucassouza.io/lab/pesquisa/2025/01/04/Pesquisa-Academica.html)**

---

<div style="display: flex; align-items: center; gap: 16px; padding: 20px; background: rgba(140, 82, 255, 0.05); border-radius: 16px; border: 1px solid rgba(140, 82, 255, 0.1); margin-top: 40px;">
    <img src="https://avatars.githubusercontent.com/u/25537761?v=4" alt="Autor" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #8C52FF;">
    <div>
        <p style="font-weight: 600; margin: 0; color: #ffffff;">Escrito por <a href="https://lucassouza.io" target="_blank" style="color: #8C52FF; text-decoration: none;">Lucas (Ls4ss)</a></p>
        <p style="font-size: 14px; color: #b0b0c0; margin: 4px 0 0 0;">Especialista em Segurança Ofensiva | Criador da DetecTI</p>
    </div>
</div>
