/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="/index"
                >
                  Zeats
                </a>
              </li>
              <li>
                <a
                  href="/index#Sobre"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="/index#BaixeAplicativo"
                  target="_blank"
                >
                  Baixe o aplicativo
                </a>
              </li>
            </ul>
          </nav>
          {/*<div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com?ref=nukr-default-footer"
              target="_blank"
            >
              Invision
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-default-footer"
              target="_blank"
            >
              Creative Tim
            </a>
            .
  </div>*/}
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;