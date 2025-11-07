import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  let navigate = useNavigate();
    signOut(auth).then(()=>{
        navigate("/");
        sessionStorage.removeItem("orders");
        sessionStorage.removeItem("userData");
    }).catch(error=> console.log(error));
    
  return (
    <div>
      Sign Out successfully!
    </div>
  );
};

export default SignOut;