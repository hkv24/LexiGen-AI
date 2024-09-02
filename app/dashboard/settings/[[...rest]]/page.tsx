import { UserProfile } from "@clerk/nextjs"


function Settings() {
  return (
    <div className="flex justify-center mt-20">
      <UserProfile />
    </div>
  )
}

export default Settings
