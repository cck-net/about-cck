import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import reactLogo from "./img/reactLogo.svg";
import nodeLogo from "./img/nodeLogo.svg";
import typescriptLogo from "./img/typescriptLogo.svg";
import vsCodeLogo from "./img/vscodeLogo.svg";
import awsLogo from "./img/awsLogo.svg";
import "./App.css";
import { Keys } from "./config/keys";

const url = Keys.apiUri;

interface ServerResponse {
  linkedin: string;
  github: GithubResponse[];
}

interface GithubResponse {
  repository: string;
  commitCount: number;
  occurredAt: Date;
}

function Header() {
  return (
    <Container fluid className="App-header">
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">CRISTIAN KFOURI</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="https://github.com/cck-net" target="tab">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </Nav.Link>
                <Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
                <Nav.Link
                  href="https://www.linkedin.com/in/cristiankfouri"
                  target="tab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </Nav.Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}

function Body() {
  const [linkedinData, setLinkedin] = useState("");
  const [githubData, setGithub] = useState([""]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ServerResponse>(url);

        const gitRes: string[] = response.data.github.map((i) => {
          return `${i.repository}, ${i.commitCount} commit ${
            i.occurredAt.toString().split("T")[0]
          }`;
        });

        setGithub(gitRes);
        setLinkedin(response.data.linkedin);
      } catch (error) {
        console.log(error);
        //setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!linkedinData) return <div>Loading from backend...</div>;

  return (
    <Container fluid className="App-body">
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Container>
            <Row>
              <Col>
                <Certificates />
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="Position">- {linkedinData} -</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="Subscript">
                  source{" "}
                  <a href="https://www.linkedin.com/in/cristiankfouri">
                    linkedin
                  </a>
                  <br />
                  &nbsp;
                </span>
              </Col>
            </Row>
            <Row>
              <p>
                This website was made to showcase my latest courses and some
                small integrations with other apis.
              </p>
            </Row>
            <Row>
              <p>
                Developed with: React, NodeJs and Typescript using Visual Studio
                Code hosted on aws.
              </p>
            </Row>
            <Row>
              <p>
                The frontend consumes an API, which queries Linkedin and Github.
              </p>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  {githubData.map((item, index) => (
                    <ListGroupItem key={index}> {item} </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="Subscript">
                  source <a href="https://github.com/cck-net">github</a>
                  <br />
                  &nbsp;
                </span>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}

function Certificates() {
  return (
    <Carousel slide data-bs-theme="dark">
      <Carousel.Item>
        <Image
          className="img-fluid"
          src="https://udemy-certificate.s3.amazonaws.com/image/UC-a2428845-53b6-4b67-82cc-18f4f5d4b771.jpg"
        />
        <Carousel.Caption>
          <a
            href="https://www.udemy.com/certificate/UC-a2428845-53b6-4b67-82cc-18f4f5d4b771/"
            target="tab"
          >
            view on udemy
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="img-fluid"
          src="https://udemy-certificate.s3.amazonaws.com/image/UC-1401f08a-a7ba-4f45-a341-7c4cbee06267.jpg"
        />
        <Carousel.Caption>
          <a
            href="https://www.udemy.com/certificate/UC-1401f08a-a7ba-4f45-a341-7c4cbee06267/"
            target="tab"
          >
            view on udemy
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="img-fluid"
          src="https://udemy-certificate.s3.amazonaws.com/image/UC-0444d3a2-88e9-4114-8a62-c7fcc40b6a13.jpg"
        />
        <Carousel.Caption>
          <a
            href="https://www.udemy.com/certificate/UC-0444d3a2-88e9-4114-8a62-c7fcc40b6a13/"
            target="tab"
          >
            view on udemy
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="img-fluid"
          src="https://udemy-certificate.s3.amazonaws.com/image/UC-20c27f49-c42a-474f-ac49-92c70850eb67.jpg"
        />
        <Carousel.Caption>
          <a
            href="https://www.udemy.com/certificate/UC-20c27f49-c42a-474f-ac49-92c70850eb67/"
            target="tab"
          >
            view on udemy
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="img-fluid"
          src="https://udemy-certificate.s3.amazonaws.com/image/UC-b9aae08a-76b0-4b16-8975-2ca2183a3a6c.jpg"
        />
        <Carousel.Caption>
          <a
            href="https://www.udemy.com/certificate/UC-b9aae08a-76b0-4b16-8975-2ca2183a3a6c/"
            target="tab"
          >
            view on udemy
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function Footer() {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(!isRotating);
  };

  return (
    <footer className="App-footer py-3">
      <Container>
        <Row>
          <Col>
            <Image
              src={reactLogo}
              className={`reactLogo ${isRotating ? "rotating" : ""}`}
              onClick={handleClick}
            />
          </Col>
          <Col>
            <Image src={nodeLogo} className="nodeLogo" />
          </Col>
          <Col>
            <Image src={typescriptLogo} className="typescriptLogo" />
          </Col>
          <Col>
            <Image src={vsCodeLogo} className="vsCodeLogo" />
          </Col>
          <Col>
            <Image src={awsLogo} className="awsLogo" />
          </Col>
        </Row>
        <Row>
          <p>contact: cck.net@gmail.com</p>
        </Row>
      </Container>
    </footer>
  );
}

function App() {
  return (
    <center>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    </center>
  );
}

export default App;
