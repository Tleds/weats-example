/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
              >
                Zeats
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#"
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
            href="https://www.invisionapp.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Invision
          </a>
          . Coded by{" "}
          <a
            href="https://www.creative-tim.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Creative Tim
          </a>
          .
        </div>*/}
      </Container>
    </footer>
  );
}

export default DarkFooter;
