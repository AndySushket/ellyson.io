/**
 * Created by Ellyson on 15/09/2022.
 */

import TemplateFor3D from './templates/mainTemplate3D';
import * as THREE from 'three';
import {ReactNode} from "react";
import {Instagram, Facebook, Twitter, LinkedIn, Mail} from '@material-ui/icons';
import {Button, IconButton} from "@material-ui/core";

export default class Main extends TemplateFor3D {
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

    navigationPanel(): ReactNode {
        return
    }

    render(): ReactNode {
        return <div>
            {this.navigationPanel()}
            <div ref="anchor" className="canvasDiv"/>
        </div>
    }
}