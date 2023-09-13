import SignupFormPage from './SignupCard'
import signUpImageL from './signupImg.png'
import { useHistory } from 'react-router-dom'
import './SignupForm.css'


export default function SignUpPage() {
    const history = useHistory()

    return (
        <>
            <div>
                <div id='fullSignUpPage-Div'>
                    <div id='signC'>
                        <i id='backArrowS' className="fa-solid fa-circle-arrow-left fa-xl" onClick={() => history.push('/home')}></i>
                        <SignupFormPage />
                    </div>
                    <div id='photoSignUpDiv'>
                        <div id='signupimage-t'>Get up to $2500 for getting started!</div>
                        <img src={signUpImageL} id='signImg' />
                    </div>
                </div>
            </div>


        </>
    )
}