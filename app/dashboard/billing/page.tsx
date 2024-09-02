import Free from "./_components/Free"
import Paid from "./_components/Paid"


function page() {
  return (
    <div className="flex h-screen flex-col items-center">
      <h2 className="text-4xl font-bold flex items-center justify-center mt-20">Upgrade With Monthly Plan</h2>
      <div className="flex gap-10 justify-center items-center my-10">
        <Free />
        <Paid />
      </div>
    </div>
  )
}

export default page
