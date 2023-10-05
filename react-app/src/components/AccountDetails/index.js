import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import Sidebar from '../Sidebar';
import './AccountDetails.css';

export default function AccountDetails() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="account-details-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="content-container">
                <div className="section">
                    <h2 className="section-title">Basic Information</h2>
                    <p className="info"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p className="info"><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="section">
                    <h2 className="section-title">Wallet Info</h2>
                    <p className="info"><strong>Buying Power:</strong> ${user.buyingPower}</p>
                </div>
                <div className="section">
                    <button className="logout-button" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
