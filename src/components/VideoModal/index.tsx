import { X } from 'lucide-react'
import React from 'react'

type props ={
  currentVideo : any
  setShowVideoModal : (arg:boolean)=>void
}
export default function VideoModal({
  currentVideo,
  setShowVideoModal
}:props) {
  console.log(currentVideo);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
            <h3 className="text-lg font-semibold text-gray-900">Video Description</h3>
            </div>
            <button
            onClick={() => setShowVideoModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            >
            <X className="w-6 h-6" />
            </button>
        </div>
        <div className="p-4">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            {/* Video player placeholder - replace with actual video component */}
            <div className=" aspect-video w-full h-full">
                <video  controls className='w-full h-full'>
                  <source src={currentVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
            </div>
        </div>
        </div>
    </div>
      
  )
}
