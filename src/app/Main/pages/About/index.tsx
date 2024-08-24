/**
 * Created by Ellyson on 2/05/2024.
 */

import React, { useEffect } from "react";
import { Container, IconButton, Avatar, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
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

function About({ location }: { location: string }) {
  const [exit, setExit] = React.useState(false);

  useEffect(() => {
    if (location !== "/") setExit(true);
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
            transition={{ duration: 0.75 }}
          >
            <Container maxWidth="lg">
              <Row className="about-container">
                <Col item xs={12} lg={4}>
                  <Avatar
                    alt="Hi"
                    src={avatar}
                    sx={{ width: 300, height: 300 }}
                  />
                  <div>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title={CONTACTS.INSTAGRAM}
                    >
                      <IconButton href={CONTACTS.INSTAGRAM} target="_blank">
                        <Instagram />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title={CONTACTS.FACEBOOK}
                    >
                      <IconButton href={CONTACTS.FACEBOOK} target="_blank">
                        <Facebook />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title={CONTACTS.TWITTER}
                    >
                      <IconButton href={CONTACTS.TWITTER} target="_blank">
                        <Twitter />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title={CONTACTS.LINKEDIN}
                    >
                      <IconButton href={CONTACTS.LINKEDIN} target="_blank">
                        <LinkedIn />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title="CV"
                    >
                      <IconButton href={pdf} target="_blank">
                        <ContactPage />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Fade}
                      enterNextDelay={300}
                      title="Email"
                    >
                      <IconButton
                        href={`mailto:${CONTACTS.EMAIL}`}
                        target="_blank"
                      >
                        <Mail />
                      </IconButton>
                    </Tooltip>
                    <div className="contact-item">{CONTACTS.LOCATION}</div>
                  </div>
                  <div>
                    <h3>Skills</h3>
                    {skillList()}
                  </div>
                </Col>

                <Col xs={12} lg={8}>
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
