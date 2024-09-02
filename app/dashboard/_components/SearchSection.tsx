import { Search } from "lucide-react"


function SearchSection({onSearchInput}: any) {
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-800 via-red-600 to-blue-800 text-[#f4ebeb]">
      <h2 className="text-3xl font-bold">Browse all templates</h2>
      <p>What would you like to create Today?</p>

      <div className="w-full flex justify-center">
        <div className="flex items-center w-[50%] gap-2 p-2 border rounded-md my-5 bg-[#f4ebeb]">
          <Search className="text-primary" />
          <input
            className="bg-transparent w-full text-primary outline-none border-none"
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearchInput(event.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection