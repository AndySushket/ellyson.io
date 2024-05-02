import React from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export default function Header() {
   return <div className="header">
       <div className="leftHeader">
           Andy Sushket
       </div>
       <div className="rightHeader">
           <div>
               <Button color="primary">
                   <Link to="/main">Home</Link>
               </Button>
           </div>
           /
           <div>
               <Button color="primary">
                   <Link to="/main/projects">Projects</Link>
               </Button>
           </div>
       </div>
   </div>
}
