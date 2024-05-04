/**
 * Created by Ellyson on 2/05/2024.
 */

import React from "react";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Projects extends React.Component<any, any> {

  private static projectsList(): React.ReactNode {
    return (
        <div className="project-list">
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
                  <Link to="/akella/TriangleWallpaper">TriangleWallpaper</Link>
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
    );
  }

  render(): React.ReactNode {
    return (
      <div>
        {Projects.projectsList()}
      </div>
    );
  }
}
