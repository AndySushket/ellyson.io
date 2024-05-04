/**
 * Created by Ellyson on 2/05/2024.
 */

import React from "react";
import { Container, IconButton, Avatar } from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Twitter,
  ContactPage,
} from "@mui/icons-material";
import "../AboutStyles.scss";
import { Col, Row } from "react-bootstrap";
import {
  CONTACTS,
  Education,
  Experience,
  MY_SKILLS,
  Summary,
} from "components/Main/pages/About/config";

const pdf = require("assets/Andrii_Sushket_CV.pdf");
const avatar = require("../../assets/avatar.jpg");

class About extends React.Component<any, any> {
  static skillList(): React.ReactNode {
    return (
      <Row className="skill-list">
        {MY_SKILLS.map((el) => (
          <span className="list-item">{el}</span>
        ))}
      </Row>
    );
  }

  static projectsList(): React.ReactNode {
    return (
      <Container className="about-page" maxWidth="lg">
        <Row className="about-container">
          <Col item xs={4}>
            <Avatar alt="Hi" src={avatar} sx={{ width: 300, height: 300 }} />
            <div>
              <IconButton href={CONTACTS.INSTAGRAM} target="_blank">
                <Instagram />
              </IconButton>
              <IconButton href={CONTACTS.FACEBOOK} target="_blank">
                <Facebook />
              </IconButton>
              <IconButton href={CONTACTS.TWITTER} target="_blank">
                <Twitter />
              </IconButton>
              <IconButton href={CONTACTS.LINKEDIN} target="_blank">
                <LinkedIn />
              </IconButton>
              <IconButton href={pdf} target="_blank">
                <ContactPage />
              </IconButton>
              <div className="contact-item">
                {CONTACTS.EMAIL}
                <Mail />
              </div>
              <div className="contact-item">{CONTACTS.PHONE}</div>
              <div className="contact-item">{CONTACTS.LOCATION}</div>
            </div>
            <div>
              <h3>Skills</h3>
              {About.skillList()}
            </div>
          </Col>

          <Col xs={8}>
            <Row>
              <h1> Andy Sushket</h1>
            </Row>
            <Row className="summary">{Summary()}</Row>
            <Row className="experience">{Experience()}</Row>
            <Row className="education">{Education()}</Row>
          </Col>
        </Row>
      </Container>
    );
  }

  render(): React.ReactNode {
    return About.projectsList();
  }
}

export default About;
