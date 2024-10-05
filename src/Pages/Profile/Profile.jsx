import { Outlet } from 'react-router-dom';

export const Profile = () => {
    return (
        <div>
            hi profile
            <Outlet />
        </div>
    )
}

// left off here... Profile isnot rendering autmatically for some reason on app
// load, however it does navigate there if I click the link in
// the Nav Bar

// need to continue to work on fetching login and getting token back