/**
 * Created by Ellyson on 2/05/2024.
 */

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";

function Projects({location}: {location: string}) {
  const [exit, setExit] = React.useState(false);

  useEffect(() => {
    if (location !== "/main/projects") setExit(true);
    else setExit(false);
  }, [location]);

  const projectsList = <div>
    <Col>
      <Row>
        <div>
          <Button>
            <Link to="/mainFunc/PositionRotationScale">
              Position Rotation Scale
            </Link>
          </Button>
          <Button>
            <Link to="/mainFunc/Quaternion">Quaternion</Link>
          </Button>
          <Button>
            <Link to="/mainFunc/Matrix">Matrix</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/Shaders/Shader1">Shader1</Link>
          </Button>
          <Button>
            <Link to="/Shaders/Shader2">Shader2</Link>
          </Button>
          <Button>
            <Link to="/Shaders/Shader3">Shader3</Link>
          </Button>
          <Button>
            <Link to="/Shaders/Shader4">Shader4</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/musicVisualization/MusicVisualization">
              MusicVisualization
            </Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/Space/Galaxy">Galaxy</Link>
          </Button>
          <Button>
            <Link to="/Space/Earth">Earth</Link>
          </Button>
          <Button>
            <Link to="/Space/Planet">Planet</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/remakeTutorialWorks/thanosPortal">
              Thanos Portal
            </Link>
          </Button>
          <Button>
            <Link to="/remakeTutorialWorks/rain">Rain</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/akella/Pepyaka">Pepyaka</Link>
          </Button>
          <Button>
            <Link to="/akella/DisplacedBox">Displaced Box</Link>
          </Button>
          <Button>
            <Link to="/akella/TriangleWallpaper">
              TriangleWallpaper
            </Link>
          </Button>
          <Button>
            <Link to="/akella/CreepingStripes">Creeping stripes</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/SomeWorks/Aviator">Aviator</Link>
          </Button>
          <Button>
            <Link to="/SomeWorks/PointLights">PointLights</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/OtherPeoplesWork/Portal">Portal</Link>
          </Button>
          <Button>
            <Link to="/OtherPeoplesWork/Benares">Benares</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/testWork/House">House</Link>
          </Button>
        </div>
      </Row>
      <Row>
        <div>
          <Button>
            <Link to="/ThreeJsJourney/Texture">Texture</Link>
          </Button>
        </div>
      </Row>
    </Col>
  </div>

  const projectsList2 = <h1>
    In progress
  </h1>

  return (
      <AnimatePresence>
        {!exit && (
            <motion.div
                className="project-list"
                initial={{opacity: 0, backdropFilter: "blur(0)"}}
                animate={{opacity: 1, backdropFilter: "blur(20px)"}}
                exit={{opacity: 0, backdropFilter: "blur(0)"}}
                transition={{duration: .75}}
            >
                {projectsList2}
            </motion.div>
        )}
      </AnimatePresence>
  );
}

function mapStateToProps(state: { ui: any }) {
  const {
    ui: {location},
  } = state;
  return {location};
}

export default connect(mapStateToProps)(Projects);
