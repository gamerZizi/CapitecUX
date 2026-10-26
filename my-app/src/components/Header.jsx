
export function Header() {

    return (

    <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
             <div className="w-30 h-10 flex items-right justify-right mr-3 text-[16px]">
                <img loading="lazy" alt="Capitec bank logo" className="hidden md:block h-10 w-auto" src="https://www.capitecbank.co.za/Static/capitec_v2/dist/assets/images/capitec-logo.svg" />
                <img loading="lazy" alt="Capitec bank logo" className="block md:hidden" src="https://www.capitecbank.co.za/Static/capitec_v2/dist/assets/images/capitec-logo-small.svg" />

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
