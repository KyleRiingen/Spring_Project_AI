import React from 'react'

// When you do {children}: children: React.ReactNode we are specifing any component can be passed into this layout
// This layout will be wrapped by the global layout as well so we will still contain the navbar and footer
function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Topics Section</h1>
      <div className="flex">
        <aside className="w-1/4 p-4 border-r"> {/* Sidebar (Optional) */}
          <ul>
            <li><a href="/topics/politics">Politics</a></li>
            <li><a href="/topics/technology">Technology</a></li>
            <li><a href="/topics/sports">Sports</a></li>
          </ul>
        </aside>
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  )
}

export default Layout
