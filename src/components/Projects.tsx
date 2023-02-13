/**
 * Created by Ellyson on 15/09/2022.
 */

import TemplateFor3D from './templates/mainTemplate3D';
import * as THREE from 'three';
import React, {ReactNode} from "react";
import {Button, IconButton} from "@material-ui/core";
import {Col, Collapse, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class Projects extends TemplateFor3D {
    private sphere: THREE.Mesh | undefined;

    initControls(): void {
        super.initControls();
        this.camera?.position.set(0, 0, 10);
    }

    initShader(): void {
        const geometry = new THREE.SphereBufferGeometry(4, 30, 30);
        const customMaterial = new THREE.ShaderMaterial();
        this.sphere = new THREE.Mesh(geometry, customMaterial);
        this.scene?.add(this.sphere);
    }

    componentDidMount(): void {
        this.init3D(undefined);
        this.initShader();
        this.initControls();
        this.animate();
    }

    animate(): void {
        if (!this.looped) return;
        super.animate();
    }

    projectsList(): ReactNode {
        return (
            <div className='project-list'>
                <Col>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/mainFunc/PositionRotationScale"}>Position Rotation Scale</Link>
                            </Button>
                            <Button>
                                <Link to={"/mainFunc/Quaternion"}>Quaternion</Link>
                            </Button>
                            <Button>
                                <Link to={"/mainFunc/Matrix"}>Matrix</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/Shaders/Shader1"}>Shader1</Link>
                            </Button>
                            <Button>
                                <Link to={"/Shaders/Shader2"}>Shader2</Link>
                            </Button>
                            <Button>
                                <Link to={"/Shaders/Shader3"}>Shader3</Link>
                            </Button>
                            <Button>
                                <Link to={"/Shaders/Shader4"}>Shader4</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/musicVisualization/MusicVisualization"}>MusicVisualization</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/Codevember/Galaxy"}>Galaxy</Link>
                            </Button>
                            <Button>
                                <Link to={"/Codevember/Planet"}>Planet</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/remakeTutorialWorks/thanosPortal"}>Thanos Portal</Link>
                            </Button>
                            <Button>
                                <Link to={"/remakeTutorialWorks/rain"}>Rain</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/akella/Pepyaka"}>Pepyaka</Link>
                            </Button>
                            <Button>
                                <Link to={"/akella/DisplacedBox"}>Displaced Box</Link>
                            </Button>
                            <Button>
                                <Link to={"/akella/TriangleWallpaper"}>TriangleWallpaper</Link>
                            </Button>
                            <Button>
                                <Link to={"/akella/CreepingStripes"}>Creeping stripes</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/SomeWorks/Planet"}>Planet</Link>
                            </Button>
                            <Button>
                                <Link to={"/SomeWorks/Aviator"}>Aviator</Link>
                            </Button>
                            <Button>
                                <Link to={"/SomeWorks/PointLights"}>PointLights</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/OtherPeoplesWork/Portal"}>Portal</Link>
                            </Button>
                            <Button>
                                <Link to={"/OtherPeoplesWork/Benares"}>Benares</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/testWork/House"}>House</Link>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Button>
                                <Link to={"/ThreeJsJourney/Texture"}>Texture</Link>
                            </Button>
                        </div>
                    </Row>
                </Col>
            </div>
        )
    }

    render(): ReactNode {
        return <div>
            {this.projectsList()}
            <div ref="anchor" className="canvasDiv"/>
        </div>
    }
}