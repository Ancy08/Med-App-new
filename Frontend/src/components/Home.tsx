import { useNavigate } from "react-router-dom"
function Home() {
    const navigate = useNavigate()
    return (
        <div className="mt-5 bg-red-100 flex flex-col justify-center min-h-screen">
            {/* heart section */}
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
                <div className="bg-gradient-to-tr from-red-500 via-red-600 to-red-300 w-20 h-20 flex items-center rounded-xl">
                    <div className="w-20 p-2 text-4xl flex justify-center">🤍</div>
                </div>
            </div>

            {/* text section */}
            <div className="text-center mt-4 ">
                <h1 className="text-3xl md:text-6xl font-bold max-w-xs md:max-w-none mx-auto text-center">Welcome to MediCare Companion</h1>
                <p className="max-w-2xl text-gray-500 mt-2 text-2xl mx-auto md:text-2xl text-center leading-relaxed">Your trusted partner in medication management. Choose your role to get started with personalized features.</p>
            </div>
            {/* Card section */}
            <div className="mt-8 p-8 w-full max-w-7xl  flex flex-col md:flex-row mx-auto gap-10 ">
                <div className="bg-white p-10 border h-96 rounded-lg border-gray-300 flex w-full md:w-1/2 flex-col items-center justify-center px-4">
                    
                    <h1 className="text-blue-600 text-xl md:text-3xl font-bold">I'm a Patient</h1>
                    <div className="text-gray-500 mt-3">
                        <p className="text-xl">Track your medication schedule and maintain your health records</p>
                        <ul className="mt-2 text-xl space-y-2 pl-5 list-disc marker:text-blue-600">
                            <li>Mark medications a taken</li>
                            <li>Upload proof photos (optional)</li>
                            <li>View your medication calendar</li>
                            <li>Large, easy-to-use interface</li>
                        </ul>

                    </div>
                    <button onClick={() => navigate("/Signup", { state: { role: "Patient" } })} className="mt-5 font-bold text-xl p-2 text-white bg-blue-700 hover:bg-blue-800 px-4 rounded-md">Continue as Patient</button>
                </div>
                <div className="bg-white p-10 border h-96 rounded-lg border-gray-300 flex w-full md:w-1/2 flex-col items-center justify-center px-4">
                    <h1 className="text-green-700 text-xl  md:text-3xl font-bold">I'm a Caretaker</h1>
                    <div className="text-gray-500 mt-2">
                        <p className="text-xl">Monitor and support your loved one's medication adherence

                        </p>
                        <ul className="mt-4 text-xl space-y-2 pl-5 list-disc marker-text-green-700">
                            <li>Monitor medication compliance</li>
                            <li>Set up notification preferences</li>
                            <li>View detailed reports</li>
                            <li>Receive email alerts</li>
                        </ul>

                    </div>
                    <button onClick={() => navigate("/signup", { state: { role: "Caretaker" } })} className="mt-10 font-bold text-xl p-2 text-white bg-green-700 hover:bg-green-800 px-4 rounded-md">Continue as Caretaker</button>
                </div>

            </div>
            <p className="flex justify-center text-gray-600 text-2xl">You can switch between roles anytime after setup</p>


        </div>



    )

}
export default Home