import { FormSearchCity } from "../FormSearchCity"
import { Header } from "../Header"

const Dashboard = () => {
  return (
    <main className="flex flex-col min-h-screen w-full bg-[#0b1225]">
      <Header />
      <FormSearchCity />
    </main>
  )
}

export { Dashboard }