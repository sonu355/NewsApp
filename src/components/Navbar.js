import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand " to="#">***News Monkey***</Link>
                        <button className="navbar-toggler" type="butn" data-bs-toggle="collapse" data-bs-target="#li-item" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><Link id="li-item" className="nav-link" to="/general">General</Link></li>
                                <li className="nav-item"><Link  id="li-item"className="nav-link" to="/entertainment">Entertainment</Link></li>
                                <li className="nav-item"><Link id="li-item" className="nav-link" to="/sports">Sports</Link></li>
                                <li className="nav-item"><Link id="li-item" className="nav-link" to="/technology">Technology</Link></li>
                                <li className="nav-item"><Link id="li-item" className="nav-link" to="/health">Health</Link></li>
                                <li className="nav-item"><Link id="li-item" className="nav-link" to="/science">Science</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default navbar
