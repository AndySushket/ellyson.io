/**
 * Created by Ellyson on 2/05/2024.
 */

import React from "react";
import { Container, IconButton, Avatar, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Twitter,
  ContactPage,
} from "@mui/icons-material";
import '../AboutStyles.scss';
import { Col, Row } from "react-bootstrap";
import {
  CONTACTS,
  Education,
  Experience,
  MY_SKILLS,
  Summary,
} from "@/test/projects/Main/pages/About/config";

// @ts-ignore
import pdf from "@/assets/Andrii_Sushket_CV.pdf";
import photo from "../../assets/avatar.jpg";

function About() {

  function skillList(): React.ReactNode {
    return (
      <Row className={"skillList"}>
        {MY_SKILLS.map((el, i) => (
          <span className={"listItem"} key={i}>{el}</span>
        ))}
      </Row>
    );
  }

  function projectsList(): React.ReactNode {
    return (
          <div className={"aboutPage"} style={{
            opacity: 1, backdropFilter: "blur(20px)"
          }}>
            <Container maxWidth="lg" >
              <Row className={'aboutContainer'}>
                <Col xs={12} lg={4}>
                  <Avatar
                    alt="Hi"
                    src={photo.src}
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
                    <div className={"contactItem"}>{CONTACTS.LOCATION}</div>
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
                  <Row className={"summary"}>{Summary()}</Row>
                  <Row className={"experience"}>{Experience()}</Row>
                  <Row className={"education"}>{Education()}</Row>
                </Col>
              </Row>
            </Container>
          </div>
    );
  }
  return projectsList();
}

export default About;
