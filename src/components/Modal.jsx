/* eslint-disable react/prop-types */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="text-red-500 float-right">
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
