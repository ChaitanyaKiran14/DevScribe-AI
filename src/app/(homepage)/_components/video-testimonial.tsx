'use client'
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

const VideoTestimonial = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center md:mt-20 p-2 flex-col gap-8 w-full h-[500px] max-w-7xl ">
      <div className="md:text-5xl text-3xl font-semibold">Video Preview</div>

      <div className="w-full md:w-1/2 h-1/2 md:h-full ">
        <ReactPlayer
          url="https://youtu.be/s0kBqGpThp0?si=9LysDWSekBmU9SIF"
          className="border-8 border-blue-400 rounded-2xl w-full m-2"
          height={'99%'}
          width={'99%'}
          
          
        />
      </div>
    </div>
  )
}

export default VideoTestimonial
