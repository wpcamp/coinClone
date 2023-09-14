import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import openWalletImage from './openwallet.png'
import Searchbar from '../Searchbar/Searchbar';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<>
			{isLoaded && (<div className='navBarDiv'>
				<div id='logoHeader'>
					<img id='navLogo' src={openWalletImage} onClick={() => {
						history.push('/')
					}} />
					<p id='headerText' onClick={() => {
						history.push('/')
					}} >OpenWallet</p>
				</div>
				<div>
					{!sessionUser && (
						<>
							<div id='actionButtonsDiv'>
								<div className='actionButtonsK'>
									<button onClick={()=> history.push('/signup')}>Sign Up</button>
								</div>
								<div className='actionButtonsK'>
									<OpenModalButton
										modalComponent={<LoginFormModal />}
										buttonText={"Sign In"} />
								</div>
							</div>
						</>
					)}
				</div>
				{isLoaded && sessionUser && <Searchbar />}
				{isLoaded && sessionUser && (
					<div id='profileButtonC'>
						<i className="fa-solid fa-user fa-2xl" onClick={() => {
							history.push('/account')
						}} />
					</div>
				)}

			</div>)}
		</>
	);
}

export default Navigation;