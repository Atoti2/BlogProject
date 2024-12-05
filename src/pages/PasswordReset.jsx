import React, {useContext} from "react";
import { UserContext } from '../context/UserContext';
import Toastify from "../components/Toastify";


const PasswordReset = () => {

  const { msg, resetPassword} = useContext(UserContext)
   
  const handleSubmit = (event) => {
    event.preventDefault();  
    const data = new FormData(event.currentTarget);
    resetPassword(data.get('email'))
  };
  
    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Password reset</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Reset password
                        </button>
                    </form>
                </div>
                {msg && <Toastify {...msg}/>}

            </div>
    );
};

export default PasswordReset;
