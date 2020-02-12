import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import api from "../../services/api";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  Table,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";


function ProfilePage(props) {
  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  useEffect(() =>{
    return;
    const email = "mc@donalds.com";
    const senha = "1234";
    async function CarregaDados(token){
      const responseMenus = await api.get('/menus', {
        headers:{"x-access-token":token},
      }).catch(e=>{
        console.log(e);
      })
    }
    const response = api.post('/login_restaurante',{
      'email':email,
      'senha':senha,
    }).then(a=>{
      let token = a.data.token;
      CarregaDados(token);
    })
    // let token = response.data.token;
    // const responseMenus = api.get('/menus', {
    //   "token":token,
    // });
    
      // console.log(responseMenus.status);
  })
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
            {/*<div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Follow
              </Button>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Follow me on Instagram
              </UncontrolledTooltip>
            </div>*/}
            <h3 className="title">Últimas vendas</h3>
            <h5 className="description">
              <p>Theo - Bloomin’ Onion - R$49,90</p>
              <p>Samuel - Aussie Cheese Fries - R$52,50</p>
              <p>Sarah - Kookaburra Wings - R$52,50</p>
            </h5>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">Menu</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        {/*<i className="now-ui-icons design_image"></i>*/}
                        <i class="fas fa-beer"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        {/*<i className="now-ui-icons design_image"></i>*/}
                        <i class="fas fa-bacon"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        {/*<i className="now-ui-icons location_world"></i>*/}
                        <i class="fas fa-drumstick-bite"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("4");
                        }}
                      >
                        {/*<i className="now-ui-icons sport_user-run"></i>*/}
                        <i class="fas fa-ice-cream"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              </Row>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Row >
                      <Col >
                      <Table>
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Tipo do produto</th>
                            <th>Preço</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Coca-cola</td>
                            <td>Garrafa com 600ml</td>
                            <td>Bebida não alcoólica</td>
                            <td>R$4,00</td>
                          </tr>
                          <tr>
                            <td>Backer - Capitao Senra</td>
                            <td>Garrafa com 600ml</td>
                            <td>Bebida alcoólica</td>
                            <td>R$12,00</td>
                          </tr>
                          <tr>
                            <td>Wals - X wals</td>
                            <td>Garrafa com 600ml</td>
                            <td>Bebida alcoólica</td>
                            <td>R$9,00</td>
                          </tr>
                        </tbody>
                      </Table>
                      </Col>
                      </Row>
                </TabPane>
                
                <TabPane tabId="pills2">
                <Row >
                      <Col >
                      <Table>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                      </Col>
                      </Row>
                </TabPane>
                <TabPane tabId="pills3">
                <Row >
                  <Col >
                    <Table>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                      </Col>
                      </Row>
                </TabPane>
                <TabPane tabId="pills4">
                <Row >
                  <Col >
                    <Table>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                      </Col>
                      </Row>
                </TabPane>
              </TabContent>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
