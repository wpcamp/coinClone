import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './Home.css'






function Home() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()




    return (
        <>
            <div>
                <div id='firstSeg'>
                    <div>
                        <img id='homePageImg' src='./homepageImg.jpg' />
                    </div>
                    <div id='firstSegText'>
                        <div id='firstSegTextDiv'>
                            The future of money is here
                        </div>
                        <div id='firstSegBlurb'>
                            OpenWallet is a clone of the most trusted place for people and businesses to buy, sell, and manage crypto, you cannot transact with actual fiat on this website.
                        </div>
                        <div id='firstSegSignUpDiv'>
                            <span>
                                <input id='firstSegInput' type='text' placeholder='Enter your email address'></input>
                            </span>
                            <span id='firstSegSignUpButton'>
                                <OpenModalButton
                                    modalComponent={<SignupFormModal />}
                                    buttonText={"Sign Up"} />
                            </span>
                        </div>
                    </div>
                </div>
                <div id='secondSeg'>
                    <div id='secondSegText'>
                        <div id='secondSegA'>
                            Explore crypto like Bitcoin, Ethereum, and Dogecoin
                        </div>
                        <div>
                            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
                        </div>
                        <div id='moreAssetButtonDiv'>
                            <button id='moreAssetButton'>See more assets</button>
                        </div>
                    </div>
                    <div id='assetBoxDiv'>
                        <div className="box" onClick={()=> {
                            history.push('/assets/btc')
                        }}><img className='coinLogos' src='./coinLogos/btc.png'/></div>

                        <div className="box" onClick={()=> {
                            history.push('/assets/eth')
                        }}><img className='coinLogos' src='./coinLogos/ethereum.png'/></div>

                        <div className="box" onClick={()=> {
                            history.push('/assets/sol')
                        }}><img className='coinLogos' src='./coinLogos/solana.png'/></div>

                        <div className="box" onClick={()=> {
                            history.push('/assets/wbnb')
                        }}><img className='coinLogos' src='./coinLogos/bnb.png'/></div>

                        <div className="box" onClick={()=> {
                            history.push('/assets/doge')
                        }}><img className='coinLogos' src='./coinLogos/Doge-icon.png'/></div>

                        <div className="box" onClick={()=> {
                            history.push('/assets/ada')
                        }}><img className='coinLogos' src='./coinLogos/ada.png'/></div>
                    </div>
                </div>
                <div id='thirdSeg'>
                    <div>


                        <div>
                            Learn more about cryptocurrencies and the technology that powers them:
                        </div>
                        <div>
                            Prioritize your financial health by conducting research and staying informed before trading cryptocurrencies. Your financial success begins with due diligence. Trade wisely at OpenWallet, don't get rugged.
                        </div>
                    </div>
                    <div>
                        <div>
                            List of links will go here
                        </div>
                    </div>
                </div>

            </div>



        </>
    );
}

export default Home;