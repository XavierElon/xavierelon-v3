import Image from 'next/image'
import GridBackground from '../components/GridBackground'

export default function Home() {
  return (
    <div className="">
      <main className="bg-[#f7f2f2]">
        {/* <CursorGradient /> */}

        {/* <Layout tab={tab} setTab={setTab} left={x} sliderWidth={w} /> */}
        <div className="w-full h-full">
          <GridBackground />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
