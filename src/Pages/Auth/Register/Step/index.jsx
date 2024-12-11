const Step = ({ steps, currentStep }) => {
    return (
        <div>
            <div className="flex items-center justify-center w-full max-w-2xl mx-auto px-4">
                {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
                    <div key={step} className="flex items-center">
                        <div className="flex items-center relative">
                            <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step === currentStep
                                ? 'bg-[#FF2A3B] text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                            >
                            {step}
                            </div>
                            {step !== steps && (
                            <div className="h-[2px] w-16 bg-gray-200 mx-2"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Step;