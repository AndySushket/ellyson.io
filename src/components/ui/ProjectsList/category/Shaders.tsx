import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/shaders/shader1">Shader1</Link>
        </Button>
        <Button>
            <Link href="/projects/shaders/shader2">Shader2</Link>
        </Button>
        <Button>
            <Link href="/projects/shaders/shader3">Shader3</Link>
        </Button>
        <Button>
            <Link href="/projects/shaders/shader4">Shader4</Link>
        </Button>
    </div>
</Row>;
