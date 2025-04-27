export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="footer-bar mx-auto flex min-h-64 max-w-[1280px] flex-col items-start justify-center px-6 py-16 md:flex-row md:justify-between">
        {/* Left Section */}
        <p className="text-md mb-4 md:mb-0">Yashraj Singh © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
