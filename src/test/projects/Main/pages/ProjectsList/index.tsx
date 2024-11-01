/**
 * Created by Ellyson on 2/05/2024.
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";

function Index({location}: {location: string}) {
  const [exit, setExit] = React.useState(false);

  useEffect(() => {
    if (location !== "/projects") setExit(true);
    else setExit(false);
  }, [location]);

  const projectsList2 = <h1>
    In progress
  </h1>

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
                {projectsList2}
            </motion.div>
        )}
      </AnimatePresence>
  );
}

function mapStateToProps(state: { ui: any }) {
  const {
    ui: {location},
  } = state;
  return {location};
}

export default connect(mapStateToProps)(Index);
