import React from 'react'
import ProfileSection from './_components/Profile'
import UpdatePasswordSection from './_components/UpdatePassword'

export default function Profile() {
  return (
    <div className='flex flex-col gap-4'>
        <ProfileSection />
        <UpdatePasswordSection />
    </div>
  )
}
