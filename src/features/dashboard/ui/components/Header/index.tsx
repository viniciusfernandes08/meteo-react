import { CloudSun } from "lucide-react";

const Header = () => {
  return (
    <header 
      className="flex items-center border-b border-b-gray-100/10 px-20 py-4"
    >
      <div className="flex gap-4 items-center">
        <CloudSun 
          size={26} 
          strokeWidth={1.8} 
          className="text-sky-300" 
        />
        <h2 
          className="text-[#F1F5F9] font-sm font-serif pt-0.5"
        >
          METEO REACT
        </h2>
      </div>
    </header>
  )
}

export { Header };