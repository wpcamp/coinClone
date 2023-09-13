import { Link } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { useSelector } from 'react-redux';
import './Footer.css'
import openWalletImage from './openwallet.png'

export default function Footer() {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    return (
        <div id="main-container">
            <div id="content">
                {/* Your main content here */}
            </div>
            <div id="footer">
                <div id='footer-col-1'>
                    <img id='navLogo' src={openWalletImage} onClick={() => {
                        history.push('/home')
                    }} />
                </div>
                <div className='footer-right'>
                    <div id='footer-col'>
                        <div className='footer-right-header'>Contact</div>
                        <div className='footer-name'>
                            <div>Will Campbell</div>
                            <div className='footer-links'>
                                <a href="https://www.linkedin.com/in/will-campbell22/" target="_blank" rel="noopener noreferrer">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/wpcamp" target="_blank" rel="noopener noreferrer">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer-copyright'>
                @ 2023 OpenWallet
            </div>
        </div>
    )
};
