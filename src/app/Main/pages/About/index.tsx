/**
 * Created by Ellyson on 2/05/2024.
 */

import React, {useEffect} from "react";
import { Container, IconButton, Avatar } from "@mui/material";
// @ts-ignore
import { AnimatePresence, motion } from "framer-motion";
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
import { connect } from "react-redux";
import {
  CONTACTS,
  Education,
  Experience,
  MY_SKILLS,
  Summary,
} from "app/Main/pages/About/config";

const pdf = require("assets/Andrii_Sushket_CV.pdf");
const avatar = require("../../assets/avatar.jpg");

function About({location}: {location: string}) {

  const [exit, setExit] = React.useState(false);

  useEffect(() => {
    if(location !== "/main") setExit(true);
    else setExit(false);
    }, [location]);

  function skillList(): React.ReactNode {
    return (
      <Row className="skill-list">
        {MY_SKILLS.map((el) => (
          <span className="list-item">{el}</span>
        ))}
      </Row>
    );
  }

  function projectsList(): React.ReactNode {
    return (
      <AnimatePresence>
        {!exit && (
          <motion.div
              className="about-page"
              initial={{ opacity: 0, backdropFilter: "blur(0)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0)" }}
              transition={{ duration: .75 }}
          >
            <Container  maxWidth="lg">
              <Row className="about-container">
                <Col item xs={4}>
                  <Avatar
                    alt="Hi"
                    src={avatar}
                    sx={{ width: 300, height: 300 }}
                  />
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
                    {skillList()}
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
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  return projectsList();
}

function mapStateToProps(state: { ui: any }) {
  const {
    ui: { location },
  } = state;
  return { location };
}

export default connect(mapStateToProps)(About);
