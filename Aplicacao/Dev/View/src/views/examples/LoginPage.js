import React from "react";
import api from '../../services/api';
// import { useAlert } from "react-alert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import { Route,Router } from "react-router-dom";
import profilePage from '../examples/ProfilePage';


// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  async function Entrar(e){
    e.preventDefault();
    
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    if(!email.value){return console.log('Ta vazio')};
    if(!senha.value){return console.log('Ta vazio')};

    const response = await api.post('/login_restaurante',{
      'email':email.value,
      'senha':senha.value,
    })
    .catch(e=>{
      if(e.response.status === 403)
    {
      console.log('Usuário ou senha incorretos');
      return;
    }
    if(e.response.status === 500)
    {
      console.log('Usuário ou senha incorretos');
    }
    });
    console.log("Loguei")
    //Redirecionar a página
    
    return (
    <>
    </>
    )
  }
  return (
    <>
    <IndexNavbar />
      {/*<ExamplesNavbar />*/}
      <div className="page-header clear-filter" filter-color="white">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div  >
                      {/* <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img> */}
                      <h2>Weats</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        id="email"
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Senha..."
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        id="senha"
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={Entrar}
                      size="lg"
                    >
                      Entrar
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="/sign-up"
                          onClick={e => e.preventDefault()}
                        >
                          Inscrever-se
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Esqueceu sua senha?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
