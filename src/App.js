import {useState} from 'react'
import Graph from './components/Graph'
import Calculator from './components/Calculator'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import UploadForm from './components/UploadForm';
import { Navbar, Col, Row } from 'react-bootstrap';
import './pages/style/Dashboard.css'

function App() {
  const [collapsed, toggleCollapse] = useState(false)

  const CustomLink = (props) => {
    const { navigate, ...rest } = props;
    return (<Nav.Link {...rest} />);
  }

  const CustomBrand = (props) => {
    const { navigate, ...rest } = props;
    return (<Navbar.Brand {...rest} />);
  }

  const toggleNavbar = (event) => {
    toggleCollapse(!collapsed)
  }


  return (
    <Router>
        <Navbar expand="lg" variant="dark" bg="dark" className="sticky-top flex-md-nowrap p-2 shadow" as="header">
            <Link to="/" className="col-md-3 col-lg-2 me-0 px-3" component={CustomBrand}>i-EMS</Link>
            <Navbar.Toggle label="Toggle navigation" onClick={toggleNavbar}/>
        </Navbar>
        <Container fluid>
        <Row>
          <Navbar expand="lg" id="sidebarMenu" expanded={collapsed} bg="dark" variant="dark" className="col-md-3 col-lg-2 d-md-block " style={{"flex-basis":"auto"}} as={Navbar.Collapse}>
            <nav>
                <Nav className="position-sticky flex-column">
                  <Nav.Item>
                    <Link to="/" component={CustomLink}>Ver grafica</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/upload" component={CustomLink}>Subir datos</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/calculator" component={CustomLink}>Calculador de energia</Link>
                  </Nav.Item>
                </Nav>
            </nav>
          </Navbar>
          <Col md={9} lg={10} id="page-content-wrapper" className="ms-sm-auto px-md-4">
            <Switch>
              <Route exact path="/" component={Graph} />
              <Route path="/calculator" component={Calculator} />
              <Route paht="/upload" component={UploadForm} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
