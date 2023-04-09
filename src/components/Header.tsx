import {Button, IconButton} from "@material-ui/core";
import {Facebook, Instagram, LinkedIn, Mail, Twitter} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function () {
   return <>
        <div className={"header"}>
            <div className={"leftHeader"}>
                Andrii Sushket
            </div>
            <div className={"rightHeader"}>
                <div>
                    <Button color="primary">
                        <Link to={"/"}>Home</Link>
                    </Button>
                </div>
                /
                <div>
                    <Button color="primary">
                        <Link to={"/Gallery"}>Gallery</Link>
                    </Button>
                </div>
                /
                <div>
                    <Button color="primary">
                        <Link to={"/Music"}>Music</Link>
                    </Button>
                </div>
                /
                <div>
                    <Button color="primary">
                        <Link to={"/About"}>About</Link>
                    </Button>
                </div>

            </div>
        </div>
    </>
}