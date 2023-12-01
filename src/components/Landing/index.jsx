import { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./landing.css";
import Navigation from "../../components/Navbar/index";
import { Container, Row, Col, Button } from "react-bootstrap";

import hero from "../../assets/images/egg-sandwich.png";
import ramen from "../../assets/images/ramen.jpg";
import ramen2 from "../../assets/images/ramen2.jpg";
import chiken from "../../assets/images/chinkenkare.png";
import bombchiken from "../../assets/images/bomb-chiken.jpg";
import coffe from "../../assets/images/coffecake.png";

const Index = () => {
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <Fragment>
      <div className="box-yellow d-none d-md-block"></div>
      <Navigation />
      <section className="vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column text-position mt-5">
              <div data-aos="fade-down-right" data-aos-duration="0">
                <h1 className="fw-bold color">
                  Discover Recipe <br />
                  &amp; Delicious Food
                </h1>
                <form className="form-inline">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded w-80"
                      placeholder=" Search Restauran Food"
                      aria-label="Search"
                      style={{ backgroundColor: "#efefef" }}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div data-aos="fade-down-left" data-aos-duration="0">
                <img
                  className="object-fit-cover rounded img-hero"
                  src={hero}
                  alt="hero"
                  width="550px"
                  height="400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="d-flex gap-3">
          <div
            style={{
              height: "60px",
              width: "10px",
              backgroundColor: "#efc81a",
            }}
          ></div>
          <div className="d-flex align-items-center">
            <h2 className="fw-bold m-0">Popular For You!</h2>
          </div>
        </div>
        <div className="my-5">
          <div className="row">
            <div className="col-md-6">
              <div data-aos="fade-up-right" data-aos-duration="0">
                <img
                  src={ramen}
                  alt="popular menu"
                  width="450px"
                  height="400px"
                  className="object-fit-cover rounded img-hero"
                />
              </div>
            </div>

            <div className="col-md-6 mt-5">
              <div data-aos="fade-down-left" data-aos-duration="0">
                <h1 className="fw-bold mb-4">
                  Healthy Bone Broth <br />
                  Ramen (Quick & Easy)
                </h1>
                <p className="mb-4">
                  Quick + Easy Chicken Bone Broth Ramen- <br />
                  Healthy chicken ramen in a hurry ? Thats <br />
                  right!
                </p>
                <button
                  className="mb-2 text-white rounded border border-0 p-2 fw-bold text-white"
                  style={{ backgroundColor: "#efc81a" }}
                >
                  Lean More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow d-none d-md-block"></div>
      <Container>
        <div className="d-flex gap-3">
          <div
            style={{
              height: "60px",
              width: "10px",
              backgroundColor: "#efc81a",
            }}
          ></div>
          <div className="d-flex align-items-center">
            <h2 className="fw-bold m-0">New Recipe</h2>
          </div>
        </div>
        <div className="my-5">
          <Row>
            <Col md={6}>
              <div data-aos="zoom-in" data-aos-duration="0">
                <img
                  src={ramen2}
                  alt="popular menu"
                  width="450px"
                  height="400px"
                  className="object-fit-cover rounded img-hero"
                />
              </div>
            </Col>
            <Col md={6} mt-5>
              <div data-aos="zoom-in-left" data-aos-duration="0">
                <h1 className="fw-bold mb-4">
                  Healthy Bone Broth <br />
                  Ramen (Quick & Easy)
                </h1>
                <p className="mb-4">
                  Quick + Easy Chicken Bone Broth Ramen- <br />
                  Healthy chicken ramen in a hurry ? Thats <br />
                  right!
                </p>
                <Button
                  className="mb-2 text-white rounded border border-0 p-2 fw-bold text-white"
                  style={{ backgroundColor: "#efc81a" }}
                >
                  Lean More
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <div className="d-flex gap-3 mb-5">
          <div
            style={{
              height: "60px",
              width: "10px",
              backgroundColor: "#efc81a",
            }}
          ></div>
          <div className="d-flex align-items-center">
            <h2 className="fw-bold m-0">Popular Recipe</h2>
          </div>
        </div>
        <Row>
          <Col md={4} className="d-flex justify-content-center mb-5">
            <div data-aos="zoom-in" data-aos-duration="0">
              <div className="position-relative">
                <img
                  src={chiken}
                  alt="new"
                  width="300px"
                  height="300px"
                  className="object-fit-cover rounded"
                />
                <div className="title">
                  <h5 className="text-dark fw-bold">
                    Chiken <br />
                    Kare
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} className="d-flex justify-content-center mb-5">
            <div data-aos="zoom-in" data-aos-duration="0">
              <div className="position-relative">
                <img
                  src={bombchiken}
                  alt="new"
                  width="300px"
                  height="300px"
                  className="object-fit-cover rounded"
                />
                <div className="title">
                  <h5 className="text-dark fw-bold">
                    Bomb <br />
                    Chiken
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} className="d-flex justify-content-center mb-5">
            <div data-aos="zoom-in" data-aos-duration="0">
              <div className="position-relative">
                <img
                  src={coffe}
                  alt="new"
                  width="300px"
                  height="300px"
                  className="object-fit-cover rounded"
                />
                <div className="title">
                  <h5 className="text-dark fw-bold">
                    Coffe <br />
                    Cake
                  </h5>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;