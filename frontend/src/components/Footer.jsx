import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600">

        {/* Logo and socials */}
        <div className="space-y-4">
          <img src="/logo.svg" alt="Logo" className="h-6" />
          <div className="flex gap-4 text-gray-500">
            <i className="fab fa-instagram" />
            <i className="fab fa-x-twitter" />
            <i className="fab fa-linkedin" />
            <i className="fab fa-facebook" />
            <i className="fab fa-youtube" />
          </div>
          <div>
            <button className="border px-3 py-1 rounded flex items-center gap-2">
              <img src="world.svg" alt="globe" className="w-4 h-4" />
              English <span className="text-xs">▼</span>
            </button>
          </div>
          <p className="text-xs">Cookie settings</p>
          <p className="text-xs mt-2">© 2025 Cube Labs, Inc.</p>
        </div>

        {/* links */}
        <div>
          <h4 className="bold text-gray-900 mb-3">Company</h4>
          <ul className="space-y-1 primary">
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Terms & privacy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bold text-gray-900 mb-3">Download</h4>
          <ul className="space-y-1 primary">
            <li><a href="#">iOS & Android</a></li>
            <li><a href="#">Mac & Windows</a></li>
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Web Clipper</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bold text-gray-900 mb-3">Resources</h4>
          <ul className="space-y-1 primary">
            <li><a href="#">Help center</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Templates</a></li>
            <li><a href="#">Affiliates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bold text-gray-900 mb-3">Notion for</h4>
          <ul className="space-y-1 primary">
            <li><a href="#">Enterprise</a></li>
            <li><a href="#">Small business</a></li>
            <li><a href="#">Personal</a></li>
          </ul>
          <p className="mt-4 bold text-gray-800 cursor-pointer">Explore more →</p>
        </div>
      </div>
    </footer>
  )
}
