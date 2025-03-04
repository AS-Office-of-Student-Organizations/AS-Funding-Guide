import { ChevronDown } from "lucide-react"

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-transform duration-300"
          aria-label="Close"
        >
          <ChevronDown size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popup

