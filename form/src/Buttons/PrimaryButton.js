import "./PrimaryButton.css";
import { motion } from "framer-motion";

function PrimaryButton(props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={
        props.isActive ? "primary-button" : "primary-button disabled-button"
      }
      onClick={() => props.clickAction()}
    >
      {props.name}
    </motion.button>
  );
}

export default PrimaryButton;
