#### ThreatTrack
     
ThreatTrack é um projeto em Python que tem como objetivo ser uma ferramenta de consulta e análise de segurança em IPs públicos e domínios, utilizando a API do Shodan (shodan.io) como base.
O script é projetado para coletar informações detalhadas sobre IPs e domínios, destacando potenciais vulnerabilidades relacionadas às versões de tecnologias mapeadas pelo Shodan.
Além disso, ele se integra aos bancos de dados do NVD (National Vulnerability Database) ao ExploitDB e GitHub, permitindo a consulta das CVEs mapeadas em busca de possíveis exploits e provas de conceitos (PoC) associados.
 
#### Características
     
+ Coleta de informações sobre IPs e Domínios utilizando a API Shodan.io.
+ Identificação de CVE's com base nas versões de tecnologias mapeadas pelo Shodan.
+ Consulta de CVE's nas fontes de dados: NVD, ExploitDB e GitHub.

#### Fluxo de consulta de dados da ferramenta

Utlizando os parâmetros **host** ou **domain** podemos fornecer para a ferramenta um endereço IP ou um domínio para que a busca inicie no Shodan, também podemos utilizar a opção **file** para fornecer uma lista de IPs ou domínios.

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
        <p style="font-weight: 600; margin: 0; color: #ffffff;">Escrito por <a href="https://github.com/Ls4ss" target="_blank" style="color: #8C52FF; text-decoration: none;">Lucas (Ls4ss)</a></p>
        <p style="font-size: 14px; color: #b0b0c0; margin: 4px 0 0 0;">Especialista em Segurança Ofensiva | Criador da DetecTI</p>
    </div>
</div>

