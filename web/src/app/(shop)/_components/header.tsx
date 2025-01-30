import Link from "next/link";

export default function Header()
{
    return (
        <div>
        <header className="relative bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                 <a href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      alt=""
                      src="https://images.vexels.com/media/users/3/142810/isolated/preview/ba0c22cef0e0d4a277d74333536482d9-logotipo-do-emblema-do-escudo.png"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href={'/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Login
                    </Link>
              
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
}