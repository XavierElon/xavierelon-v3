import { TabKey } from '../../interfaces/enums'

interface NavbarProps {
  tab: TabKey
  setTab: (tab: TabKey) => void
  left?: number
  sliderWidth?: number
}

const Navbar: React.FC<NavbarProps> = ({ tab, setTab, left = 0, sliderWidth = 0 }) => {
  const tabs = [
    { key: TabKey.All, label: 'All' },
    { key: TabKey.About, label: 'About' },
    { key: TabKey.Work, label: 'Work' },
    { key: TabKey.Projects, label: 'Projects' },
    { key: TabKey.Contact, label: 'Contact' }
  ]

  return (
    <div className="bg-black-1 text-white mx-auto sticky top-0 z-[10000] backdrop-saturate-180 backdrop-blur-lg md:display-none pt-2 mb-24 opacity-50">
      <div className="bg-transparent text-white max-w-[900px] m-auto rounded-full  text-1.8rem border-b border-gray-200 p-[3px]">
        <div className="flex rounded-33px p-2 justify-between items-center text-[#111827] max-w-[900px] mx-auto">
          {tabs.map(({ key, label }) => (
            <div key={key} className={`flex items-center h-8 flex-1 cursor-pointer justify-center ${tab === key ? 'text-white' : 'text-white'}`} onClick={() => setTab(key)}>
              {label}
            </div>
          ))}
          <div
            className="absolute h-10 bg-[#fc205e]/40 border border-[#fc205e] rounded-full z-20"
            style={{
              left: `${left}px`,
              width: `${sliderWidth}px`,
              transition: 'left 0.38s cubic-bezier(0.5, 0, 0, 0.75)'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
