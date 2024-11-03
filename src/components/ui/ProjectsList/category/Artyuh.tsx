import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/akella/pepyaka">Pepyaka</Link>
        </Button>
        <Button>
            <Link href="/projects/akella/displaced_box">Displaced Box</Link>
        </Button>
        <Button>
            <Link href="/projects/akella/triangle_wallpaper">
                TriangleWallpaper
            </Link>
        </Button>
        <Button>
            <Link href="/projects/akella/creeping_stripes">Creeping stripes</Link>
        </Button>
    </div>
</Row>;
