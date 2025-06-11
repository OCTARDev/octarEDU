import { GoAlertFill } from "react-icons/go";

  // Modal component
  const ErrorModal = ({ 
        onConfirm,
        onCancel ,
        title = "Activate Your Email Address?",
        message = "You will be redirected to your profile page.",
        yesButton = "Yes",
        noButton = "No, Cancel"
    }: any) => (
    <>
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl transform transition-all duration-200 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Content */}
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <GoAlertFill className="w-8 h-8 text-yellow-500" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>

              {/* Message */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {message}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                >
                  {noButton}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {yesButton}
                </button>
              </div>
            </div>
          </div>
        </div>
     </>
  );

  export default ErrorModal;