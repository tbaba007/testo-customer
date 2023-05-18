import { ButtonProps } from "./types";
import ButtonStyles from './Button.module.css'
const Button = ({ backgroundColor, text, onClick }: Partial<ButtonProps>) => {
  return (
    <button style={{ backgroundColor: backgroundColor }} className={ButtonStyles.buttonContainer} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
