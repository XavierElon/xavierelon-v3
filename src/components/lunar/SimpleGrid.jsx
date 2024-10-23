export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center bg-zinc-900">
      <div className="relative mx-auto flex h-80 w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="absolute inset-0 bg-center bg-grid-zinc-600 bg-grid-24"></div>
        <div className="relative bg-gradient-to-br from-white to-white/30 bg-clip-text text-5xl font-semibold text-transparent">Tailwind CSS Grid</div>
      </div>
    </div>
  )
}
