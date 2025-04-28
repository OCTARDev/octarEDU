import React from 'react'
import authImage from "@/assets/nobg.png";
import Image from 'next/image'

export default function SideImageComponent() {
  return (
    <aside className=' sm:rounded-l-[50px] flex items-center justify-center max-w-full'>
        <Image
        src={authImage}
        alt='Students at graduation ceremony'
        className=' max-h-screen'
        />
    </aside>
  )
}
