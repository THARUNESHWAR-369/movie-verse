

import React from 'react'

function GenreComponent() {
  return (
    <>
      <ul className="flex gap-2 text-white items-center">
        <li className="border-2 px-2 py-1 rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-white/30">
          Action
        </li>
        <li className="border-2 px-2 py-1 rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-white/30">
          Comedy
        </li>
        <li className="border-2 px-2 py-1 rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-white/30">
          Horror
        </li>
        <li className="border-2 px-2 py-1 rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-white/30">
          Drama
        </li>
      </ul>
    </>
  );
}

export default GenreComponent