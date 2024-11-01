/**
 * Created by Ellyson on 2/05/2024.
 */

import React, {useEffect} from 'react';
import { Container, IconButton, Avatar, Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useGlobalState } from 'state/GlobalStateProvider';

import { Facebook, Instagram, LinkedIn, Mail, Twitter, ContactPage } from '@mui/icons-material';
// @ts-ignore
import { AnimatePresence, motion } from 'framer-motion';
import './AboutStyles.scss';
import { Col, Row } from 'react-bootstrap';

// @ts-ignore
import pdf from 'assets/Andrii_Sushket_CV.pdf';
import photo from 'assets/avatar.jpg';
import { CONTACTS, Education, Experience, MY_SKILLS, Summary } from './config';

function About() {

  const [exit, setExit] = React.useState(false);
  const { state } = useGlobalState();
  const { location } = state;

  console.log('location', location);

  useEffect(() => {
    if (location !== "/") setExit(true);
    else setExit(false);
  }, [location]);

  function skillList(): React.ReactNode {
    return (
      <Row className="skillList">
        {MY_SKILLS.map((el, i) => (
          <span className="listItem" key={i}>
            {el}
          </span>
        ))}
      </Row>
    );
  }

  function projectsList(): React.ReactNode {
    return (
      <AnimatePresence>
        {!exit && (
          <motion.div
            className="aboutPage"
            initial={{ opacity: 0, backdropFilter: 'blur(0)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0)' }}
            transition={{ duration: 0.75 }}
          >
            <Container maxWidth="lg">
              <Row className="aboutContainer">
                <Col xs={12} lg={4}>
                  <Avatar alt="Hi" src={photo.src} sx={{ width: 300, height: 300 }} />
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
                    <Tooltip TransitionComponent={Fade} enterNextDelay={300} title="CV">
                      <IconButton href={pdf} target="_blank">
                        <ContactPage />
                      </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Fade} enterNextDelay={300} title="Email">
                      <IconButton href={`mailto:${CONTACTS.EMAIL}`} target="_blank">
                        <Mail />
                      </IconButton>
                    </Tooltip>
                    <div className="contactItem">{CONTACTS.LOCATION}</div>
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

export default About;
