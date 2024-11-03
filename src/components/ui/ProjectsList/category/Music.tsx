import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import Link from 'next/link';
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link href="/projects/music_visualization">
                MusicVisualization
            </Link>
        </Button>
    </div>
</Row>;
