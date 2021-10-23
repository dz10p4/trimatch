import "./RegistrationSuccessful.css";
import { motion } from "framer-motion";
import lottie from "lottie-web";
import { useRef } from "react";

function RegistrationSuccessful() {
  // setTimeout(() => {
  //   lottie.loadAnimation({
  //     container: lottieContainer.current,
  //     renderer: "svg",
  //     loop: false,
  //     autoplay: true,
  //     animationData: require("./assets/valentines.json"),
  //   });
  // }, 500);

  const lottieContainer = useRef(null);

  return (
    <div className="success-container">
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Odezwiemy się mailowo!
      </motion.h1>
      <motion.div ref={lottieContainer} className="animation-div" />
    </div>
  );
}

export default RegistrationSuccessful;
