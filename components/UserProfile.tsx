import {User} from "../lib/types";

// UI component for user profile  
export default function UserProfile(props: {user: User}) {
    return (
      <div className="box-center">
        <img src={props.user.photoURL || '/hacker.png'} className="card-img-center" 
        referrerPolicy="no-referrer" />
        <p>
          <i>@{props.user.username}</i>
        </p>
        <h1>{props.user.displayName || 'Anonymous User'}</h1>
      </div>
    );
  }