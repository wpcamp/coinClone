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
                    <h2>Basic Information</h2>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                </div>
                <div className="section">
                    <h2>Wallet Info</h2>
                    <p>Buying Power: ${user.buyingPower}</p>
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
