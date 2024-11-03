import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/fundamentals/transform">
                Position Rotation Scale
            </Link>
        </Button>
        <Button>
            <Link href="/projects/fundamentals/quaternion">Quaternion</Link>
        </Button>
        <Button>
            <Link href="/projects/fundamentals/matrix">Matrix</Link>
        </Button>
    </div>
</Row>;
