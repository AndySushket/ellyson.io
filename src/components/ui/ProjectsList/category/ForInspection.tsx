import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/other_peoples_work/portal">Portal</Link>
        </Button>
        <Button>
            <Link href="/projects/other_peoples_work/benares">Benares</Link>
        </Button>
    </div>
</Row>
