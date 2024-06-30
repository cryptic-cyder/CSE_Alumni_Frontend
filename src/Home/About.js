import React from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import "./AboutUs.css";

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <Navbar1 />
      <main className="about-us-content">
      
      <section id="hero" className="hero-section">
          <div className="hero-content">
            <h1><b>Welcome to the Department of Computer Science & Engineering</b></h1>
          </div>
        </section>

        <section id="mission" className="section">
          <div className="section-content">
            <p>
              The Department of Computer Science and Engineering (CSE) was
              established in 1998 with the capacity of 60 students per session
              with a vision to produce skilled computer professionals for the
              betterment of the world and to nourish the technology. Currently,
              the number of undergraduate student intake is 130 per academic
              session (two sections of 65 students each).From the year 2011, the
              department has launched the post-graduate programs which include
              M. Sc. Engineering and M. Engineering. The department has started
              the PhD program from the year 2015. The faculty members are
              devotedly doing research works with their under graduate and post-
              graduate students. Their research efforts contribute around a good
              number of publications every year in different national and
              international conferences and journals. The department publishes a
              peer reviewed research journal “Computer Science and Engineering
              Research Journal” every year as well. The Department of CSE is
              providing quality education with its competent faculty and well
              equipped modern laboratories. Moreover, the teacher-student
              relationship is especially commendable. Proper learning
              environment best fosters the competency of the students. The
              department of CSE regularly arranges co-curricular activities such
              as workshops/seminars, training, and practical demos. The student
              organization of the department, namely CUET Computer Club is also
              active in organizing co-curricular and extra-curricular
              activities. It organizes programming contests regularly through to
              prepare the students for the ACM collegiate and other competitive
              programming contests.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUsPage;
