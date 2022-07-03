import React from "react";

import "./index.scss";

const App = () => {

  return (
    <div className="w-full text-gray-700 min-h-screen grid grid-cols-12 justify-center justify-items-center items-center">
        <div className="w-full flex flex-col gap-2 justify-items-start content-start justify-start items-start sm:p-1 p-2 rounded-md bg-gray-200 sm:col-start-2 sm:col-end-12 col-span-full">
          <span className="text-xl font-semibold">Edit your profile</span>
          
          <label className="w-full flex flex-col">
            <span className="p-2 font-semibold">Full name</span>
            <input 
                type="text" 
                name="name" 
                className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                placeholder="Your Full name"
                />
          </label>
          <label className="w-full flex flex-col">
            <span className="p-2 font-semibold">Email</span>
            <input 
                type="email" 
                name="email" 
                className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                placeholder="Your Email"
                />
          </label>
          <label className="w-full flex flex-col">
            <span className="p-2 font-semibold">Existing password</span>
            <input 
                type="password" 
                name="password" 
                className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                placeholder="Existing password (Required)"
                />
          </label>
          <label className="w-full flex flex-col">
            <span className="p-2 font-semibold">New password</span>
            <input 
                type="password" 
                name="password" 
                className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                placeholder="New password"
                />
          </label>

          <span className="p-2 mt-5 text-center font-semibold cursor-pointer shadow-lg sm:shadow-blue-500/50 text-white rounded-md bg-blue-500">
            Submit
          </span>
        </div>
    </div>
  );
}

export default App

// ReactDOM.render(<App />, document.getElementById("app"));
