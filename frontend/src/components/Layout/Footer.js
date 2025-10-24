import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sistema de Gestão de Rodovias</h3>
            <p>Gerenciamento integrado de rodovias e pontes</p>
          </div>
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li><a href="/sobre">Sobre o Sistema</a></li>
              <li><a href="/ajuda">Ajuda</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Informações</h4>
            <p>Sistema desenvolvido para gestão pública</p>
            <p>Versão 1.0.0</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Governo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

