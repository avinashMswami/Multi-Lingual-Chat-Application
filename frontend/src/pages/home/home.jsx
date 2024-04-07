// import React from rea

import { MessageContainer } from "../../components/MessageContainer"
import { Sidebar } from "../../components/Sidebar"

const Home = () => {
  return (
    <div className="h-screen p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 overflow-auto ">
      <div className="flex">
        <Sidebar />
      <MessageContainer />
      {/* helo home page here */}
      </div>
    </div>
  )
}

export default Home