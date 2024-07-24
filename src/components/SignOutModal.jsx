import "./SignOutModal.css";

const SignOutModal = ({ isOpen, onClose, onSignOut }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Sign Out</h2>
                <p>Are you sure you want to sign out?</p>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onSignOut}>Yes, Sign Out</button>
            </div>
        </div>
    );
};

export default SignOutModal;
