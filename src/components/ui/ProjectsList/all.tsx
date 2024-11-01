/**
 * Created by Ellyson on 2/05/2024.
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {Col} from "react-bootstrap";

import Space from "./category/Space";
import Music from "./category/Music";
import Artyuh from "./category/Artyuh";
import ForInspection from "./category/ForInspection";
import Shaders from "./category/Shaders";
import Test from "./category/Test";
import UpdatingPerformance from "./category/UpdatingPerformance";
import Basics from "./category/Basics";


const projectsList = <Col>
    <Space/>
    <Music/>
    <Artyuh/>
    <ForInspection/>
    <Shaders/>
    <Test/>
    <UpdatingPerformance/>
    <Basics/>
</Col>;

function Projects({location}: {location: string}) {
  const [exit, setExit] = React.useState(false);

  useEffect(() => {
    if (location !== "/projects2") setExit(true);
    else setExit(false);
  }, [location]);

  return (
      <AnimatePresence>
        {!exit && (
            <motion.div
                className="project-list"
                initial={{opacity: 0, backdropFilter: "blur(0)"}}
                animate={{opacity: 1, backdropFilter: "blur(20px)"}}
                exit={{opacity: 0, backdropFilter: "blur(0)"}}
                transition={{duration: .75}}
            >
                {projectsList}
            </motion.div>
        )}
      </AnimatePresence>
  );
}

export default Projects;
