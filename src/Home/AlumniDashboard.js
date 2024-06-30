import React from "react";
import styled from "styled-components";
import Navbar1 from "../components/Navbar1";
import AlumniList from "../components/AlumniList";
import Footer from "../components/Footer";
import { Carousel } from "react-bootstrap";

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Wrapper for the carousel with a watermark-like background
const CarouselBackground = styled.div`
  position: relative;
  background: url("https://scontent.fcla7-1.fna.fbcdn.net/v/t1.6435-9/106379560_1553619668144678_4023793802611050592_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH0BPVLNWB4GK6HjaNdyEsnS62494iCCvdLrbj3iIIK9wQ1ONdprAMs90KCQbtol_QNB-ztbtedvMu175vuIni5&_nc_ohc=NotIzxZxWlIQ7kNvgHuddS-&_nc_ht=scontent.fcla7-1.fna&oh=00_AYByZVwTj4KwLV1TiYazJ7PJQZZrm9KvV7YlUlsUOYMTrA&oe=6687F6F9")
    center center no-repeat;
  background-size: cover;
  height:310px;
`;

const HomePage = () => {
  return (
    <PageContainer>
      <Navbar1 style={{ marginTop: "20px" }} />
      <CarouselBackground>
        <CarouselWrapper>
          <Carousel>
            {/* <Carousel.Item>
              <img
                className="d-block w-100"
                src=" https://scontent.fcla7-1.fna.fbcdn.net/v/t39.30808-6/311238028_114734728067860_3205452865634259220_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGZ4yfDMMLtd_GdikFlXMCy9ul7ctb_xOH26Xty1v_E4Rc3RMi98mIppFEg89vkBX3gyhifWZuL0VPfUq3jKmrj&_nc_ohc=fWDdT9b3Y6gQ7kNvgGPdWEO&_nc_ht=scontent.fcla7-1.fna&oh=00_AYCzdtX8EZOACZCsTTywW0gpE_8qJp27jOva2pQ9k2IgyQ&oe=666545E1
                "
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt="Second slide"
              />
            </Carousel.Item> */}

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://scontent.fcla7-1.fna.fbcdn.net/v/t39.30808-6/302096319_496425385825246_7334080398311558194_n.png?stp=dst-png_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFw-B3r_iBPgtq7SHmEjcMYH1eJOP9aS4wfV4k4_1pLjMdRjBZIkBncZdMlBWG-zr4FdLbfj6O_KnyjYmnpTAgy&_nc_ohc=M47wKejRFPEQ7kNvgGzc-s9&_nc_ht=scontent.fcla7-1.fna&oh=00_AYAT1rpvxbhinSJrwdh1n0jMkGg_g4M4nxXhDRK8KDqM8w&oe=668720F5"
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt="First slide"
              />
            </Carousel.Item>


            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/OIP.vO15YmQoj29A9aXEipVtCQHaEK?rs=1&pid=ImgDetMain"
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt="First slide"
              />
            </Carousel.Item>


            

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/OIP.kTO0mACgrCDjBom5QuVjEwHaEK?rs=1&pid=ImgDetMain"
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt="Second slide"
              />
            </Carousel.Item>


            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://engineersconsortiumltd.com.bd/ecl/uploads/project/136351754_3777762142259392_5998423718529669784_o.jpg"
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt="Second slide"
              />
            </Carousel.Item>       
          </Carousel>
        </CarouselWrapper>
      </CarouselBackground>
      <AlumniListWrapper>
        <AlumniList />
      </AlumniListWrapper>
      <Footer />
    </PageContainer>
  );
};

const CarouselWrapper = styled.div`
  margin-bottom: 1rem; /* Adjust the margin-bottom to create a gap between carousel and Navbar1 */
`;

const AlumniListWrapper = styled.div`
  padding: 0;
`;

export default HomePage;
