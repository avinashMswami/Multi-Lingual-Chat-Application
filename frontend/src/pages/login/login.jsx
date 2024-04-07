import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

    const Login = () => {

      const [username,setUsername] = useState("")
      const [password,setPassword] = useState("")
      
      // const [loading,setLoading] = useState(false) 

      const {loading,login} = useLogin()

      const handleSubmit = async(e)=>{
        e.preventDefault();
        login({username,password})
      }

      return (
        <div>
          <div className='flex flex-col justify-center items-center h-screen  '>
            <div className="w-50 p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
              <h1 className='text-lg font-semibold text-center text-gray-300'>
                Login <span className="text-blue-500 ">Chat Application</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="label p-2 ">
                    <span className="text-lg label-text text-align-last: left-0 text-white">Username:</span></label>
                    <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-8 ml-1" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
    
                    />
                  
                  <label className="label p-2">
                    <span className="text-lg label-text text-white">Password:</span></label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-8 ml-1.5"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                  
                  
                  <Link to='/signup' className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block" >{"Don't"} have an account?</Link>

                  <button className="btn btn-block btn-sm mt-2.5 hover:text-blue-600"
                  disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span>: "Login!"}
                  </button >
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
    
    
 

export default Login;

// ==========================================================================================================================================================


// STATER CODE FOR THIS FILE

// const Login = () => {
//   return (
//     <div>
//       <div className='flex flex-col justify-center items-center h-screen  '>
//         <div className="w-50 p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
//           <h1 className='text-lg font-semibold text-center text-gray-300'>
//             Login <span className="text-blue-500 ">Chat Application</span>
//           </h1>
//           <form>
//             <div>
//               <label className="label p-2 ">
//                 <span className="text-lg label-text text-align-last: left-0 text-white">Username:</span></label>
//                 <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-8 ml-1" />
              
//               <label className="label p-2">
//                 <span className="text-lg label-text text-white">Password:</span></label>
//                 <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-8 ml-1.5" />

              
              
//               <a href='#' className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block" >{"Don't"} have an account?</a>

//               <button className="btn btn-block btn-sm mt-2.5">
//                 Login!
//               </button >
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };




// export default Login;
