import React, {Component} from 'react';
import {connect} from 'react-redux';
// 1. we import `addNotification` (thunk action creator)
import { addNotification } from 'react-awesome-notifications';
 
class MyComponent extends Component {
  constructor(props) {
    super(props);
    // 4. don't forget to bind method
    this._onClick = this._onClick.bind(this);
  }
 
  _onClick() {
    const {addNotification} = this.props;
    // 3. we use `addNotification` to create a notification
    addNotification({
      title: 'Welcome',
      message: 'you clicked on the button',
      level: 'success',
      dismissible: true,
      dismissAfter: 3000
    });
  }
 
  render() {
    return (
      <div>
        // 5. we notify user when he click on the button
        <button onClick={this._onClick}>Add a notification</button>
      </div>
    );
  }
}
// 2. we map dispatch to props `addNotification` async action creator
//    here we use a shortcut instead of passing a `mapDispathToProps` function
export default connect(null, {addNotification})(MyComponent);