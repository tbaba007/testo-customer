import ReactDOM from "react-dom"
import { ModalProps } from "./types"
import modalStyles from './modal.module.css'
const Modal=({children}:ModalProps)=>{
    return (
        <div className={modalStyles.modal}>
        {ReactDOM.createPortal(
           children,
           document.getElementById("root-modal")!!
        )}
     </div>
    )
}

export default Modal;