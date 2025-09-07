import MemoryGame from "./components/MemoryGame";
export const runtime = "experimental-edge";
const MemoryCards = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MemoryGame />
    </main>
  )
}

export default MemoryCards


