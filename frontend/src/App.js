import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import LoginView from './components/LoginView';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/login'>
                        <LoginView />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
