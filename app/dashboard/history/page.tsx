import Body from "./_components/Body"
import Header from "./_components/Header"
import Middle from "./_components/Middle"

// #Bug -> not able to figure out a way to render the history of that particular user.
// Now the thing being rendered is everything in my database created by any user.

export interface HISTORY {
  id: number,
  formData: string,
  aiResponse: string,
  templateSlug: string,
  createdBy: string,
  createdAt: string
}

function page() {
  return (
    <div className="m-10 p-5 rounded-lg bg-white">
      <Header />
      <Middle />
      <Body />
    </div>
  )
}

export default page
