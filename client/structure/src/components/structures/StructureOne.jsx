import React from 'react'

import styles from "./StructureOne.module.css"

const StructureOne = ({ header, sidebar, content }) => {

  return (
    <div className="grid grid-cols-12">
        {/*hidden */}
        <input type="checkbox" className={styles.sidebarBtn} name="checkbox" id="sidebarCheckbox" />
        
        <div className="w-full col-span-full mb-5 flex flex-row">
          <span className="sm:hidden visible">
            <label htmlFor="sidebarCheckbox" className="bg-red-500">toggle</label>
          </span>
          <div className="w-full">
            { header && React.Children.only(header)}
          </div>
        </div>

        <div className={`w-full ${styles.sidebar} sm:relative absolute sm:min-h-screen min-h-screen grid grid-cols-1 col-start-1 md:col-end-4 col-end-5 overflow-y-auto`}>
            
          <div className="sm:w-full absolute top-0 w-11/12 grid grid-cols-1 h-full">
            <span className="sm:hidden visible min-h-full absolute right-0">
              <label htmlFor="sidebarCheckbox" className="bg-red-500">toggle</label>
            </span>
            { sidebar && React.Children.only(sidebar) }
          </div>
            
        </div>
        
        <div className="w-full md:col-start-4 col-end-13 sm:col-start-5 col-start-1">
            { content && React.Children.only(content) }
        </div>
    </div>
  )
}

export default StructureOne