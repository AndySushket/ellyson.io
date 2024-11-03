import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/space/galaxy">Galaxy</Link>
        </Button>
        <Button>
            <Link href="/projects/space/earth">Earth</Link>
        </Button>
        <Button>
            <Link href="/projects/space/planet">Planet</Link>
        </Button>
    </div>
</Row>;
