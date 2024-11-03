import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/some_works/aviator">Aviator</Link>
        </Button>
        <Button>
            <Link href="/projects/some_works/point_lights">PointLights</Link>
        </Button>
        <Button>
            <Link href="/projects/test_works/house">House</Link>
        </Button>
    </div>
</Row>
