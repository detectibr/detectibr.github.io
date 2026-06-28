#### O que é o ThreatTrack?
     
ThreatTrack é um projeto em Python que tem como objetivo ser uma ferramenta de consulta e análise de segurança em IPs públicos e domínios, utilizando a API do Shodan (shodan.io) como base.
O script é projetado para coletar informações detalhadas sobre IPs e domínios, destacando potenciais vulnerabilidades relacionadas às versões de tecnologias mapeadas pelo Shodan.
Além disso, ele se integra aos bancos de dados do NVD (National Vulnerability Database) ao ExploitDB e GitHub, permitindo a consulta das CVEs mapeadas em busca de possíveis exploits e provas de conceitos (PoC) associados.
 
#### Características
     
A essência do projeto é descrita como "O melhor de 3 mundos", pois isso representa a sua capacidade de agregar e cruzar dados de diferentes fontes vitais de segurança cibernética em uma única execução:

* **Shodan.io:** O motor de busca inicial que varre portas abertas, serviços expostos e coleta as versões exatas das tecnologias rodando no alvo.
* **NVD (National Vulnerability Database):** Utilizado para mapear as versões descobertas pelo Shodan contra vulnerabilidades conhecidas (CVEs).
* **ExploitDB & GitHub:** Fontes consultadas ativamente pela ferramenta para descobrir se as vulnerabilidades mapeadas possuem exploits públicos ou Provas de Conceito (PoCs) já desenvolvidas.

#### Fluxo de Execução e Arquitetura

A ferramenta automatiza o trabalho braçal de um operador de Red Team durante a enumeração inicial. O fluxo de dados segue esta lógica:

* **Entrada do Alvo:** O script recebe um IP, um domínio ou uma lista (via arquivo txt).
* **Enumeração Passiva:** Uma chamada à API do Shodan é feita. A resposta traz um panorama de infraestrutura, incluindo banners com versões de softwares expostos, e mais importante, a relação de CVE's aos serviços expostos.
* **Triagem de Vulnerabilidades:** Com os dados do Shodan em mãos, o ThreatTrack relaciona as tecnologias e as CVEs que afetam os serviços identificados.
* **Enriquecimento de Exploração:** Em vez de apenas listar as CVEs, o script dá o próximo passo:
     - Consulta a base do NVD para extrair o impacto e a pontuação CVSS.
          - Usa o utilitário cve_searchsploit para vasculhar a base de dados do ExploitDB.
          - Faz o scraping no GitHub em busca de repositórios que contenham exploits para aquelas CVEs exatas.

![alt text](https://raw.githubusercontent.com/Ls4ss/blog/main/assets/images/posts/ThreatTrack_Flow.gif)

#### Instalação
```bash
git clone https://github.com/detectibr/ThreatTrack.git
```
```bash
pip3 install -r requirements.txt
```
        
**Atualize a base de dados de exploits ao instalar e sempre que necessário**
```bash
python3 ThreatTrack.py --xdbupdate
```
Observe atentamente o **help** da ferramenta, ela fornece um guia bem detalhado das diversas opções presentes na ferramenta, como por exemplo, a possíbilidade de se utilizar filtros do Shodan e as opções de consulta de dados sobre CVE's:
```bash
--nvd ( Busca por referências no NVD )
--cve ( Listar CVE's )
--cvss ( Detalhes da severidade das CVE's )
--git ( Busca por PoC's no GitHub )
--xdb ( Busca por Exploits no ExploitDB )
```
![alt text](https://raw.githubusercontent.com/Ls4ss/ThreatTrack/main/example/tt_help.png)

**O ThreatTrack é uma ferramenta em constante adaptação e correção, fique a vontade para relatar qualquer problema ou melhoria.**

---

<div style="display: flex; align-items: center; gap: 16px; padding: 20px; background: rgba(140, 82, 255, 0.05); border-radius: 16px; border: 1px solid rgba(140, 82, 255, 0.1); margin-top: 40px;">
    <img src="https://avatars.githubusercontent.com/u/25537761?v=4" alt="Autor" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #8C52FF;">
    <div>
        <p style="font-weight: 600; margin: 0; color: #ffffff;">Escrito por <a href="https://lucassouza.io" target="_blank" style="color: #8C52FF; text-decoration: none;">Lucas (Ls4ss)</a></p>
        <p style="font-size: 14px; color: #b0b0c0; margin: 4px 0 0 0;">Especialista em Segurança Ofensiva | Criador da DetecTI</p>
    </div>
</div>

