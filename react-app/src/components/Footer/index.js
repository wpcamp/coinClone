import './Footer.css'

export default function Footer() {
    return (
        <div id="main-container">
            <div id='footer-1'>
                <div id='footer-copyright'>
                    @ 2023 OpenWallet
                </div>
                <div id='footer-logos'>
                    <img src="../../imgs/react.svg" alt="React" />
                    <img src="../../imgs/redux-original.svg" alt="Redux" />
                    <img src="../../imgs/flask.png" alt="Flask" />
                    <img src="../../imgs/javascript-js.svg" alt="JavaScript" />
                    <img src="../../imgs/python.svg" alt="Python" />
                    <img src="../../imgs/css3.svg" alt="CSS" />
                    <img src="../../imgs/html5.svg" alt="HTML" />
                    <img src='../../imgs/coingecko.png' alt='CoinGecko' />
                </div>
            </div>
            <div className='footer-2'>
                <div className='footer-right-header'>Contact</div>
                <div className='footer-name'>
                    <div>Will Campbell</div>
                    <div className='footer-links'>
                        <a href="https://www.linkedin.com/in/will-campbell22/" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/wpcamp" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href='https://willcampbell.xyz' target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-globe"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};


