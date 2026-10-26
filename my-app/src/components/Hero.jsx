

 function Hero() {
    return (
        <section className="bg-gradient-to-br py-20 lg:py-12">
            <div className="max-w-9xl flex items-center justify-center bg-white mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-foreground max-w-lg font-bold text-[36px] sm:text-[72px]">Loan eligibilty</h1>
                            <p className="text-muted-foreground max-w-md text-[#3a3a3a] text-[20px] sm:text-[24px]">Find out how much you can qualify for.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
