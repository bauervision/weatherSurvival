import React from 'react';
import './bottom-styles.scss';

import { SignUserOut } from "../../Helpers/auth";

const BottomDrawer = ({ handleLogOut }) => {

    const handleSignOut = async () => {
        const loggedOut = await SignUserOut();
        if (loggedOut) {
            handleLogOut()
        }
    }

    return (
        <div className="bottomDrawer">
            <div>My Status</div>
            <div className="flex justifyCenter padding">
                <button type="button" onClick={handleSignOut}>Log-out</button>
            </div>
        </div>
    )
}
export default BottomDrawer;