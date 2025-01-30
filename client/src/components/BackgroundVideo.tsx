import React from 'react'

const BackgroundVideo = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
            <video
                className="w-full h-full object-cover"
                src="/videos/loop_bg_minimized.mp4"
                autoPlay
                loop
                muted
            />
            {/* Nếu cần overlay, thêm lớp này */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        </div>
    )
}

export default BackgroundVideo
