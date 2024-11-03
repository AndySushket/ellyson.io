import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/tutorials/thanos_portal">
                Thanos Portal
            </Link>
        </Button>
        <Button>
            <Link href="/projects/tutorials/rain">Rain</Link>
        </Button>
    </div>
</Row>;
