import { X } from "lucide-react"
import "..\styles\PopupStyles.css";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button
          onClick={onClose}
          className="popup-close"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popup;
