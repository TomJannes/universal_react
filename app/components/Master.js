import React from 'react';
import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import { MenuItem } from 'material-ui/lib/menu';
import reactMixin from 'react-mixin';
import { History, Navigation } from 'react-router'

let menuItems = [
        { route: '/', text: 'Home' },
        { route: '/test', text: 'Test' },
        { route: '/client', text: 'Client management' },
        { route: '/user', text: 'User management' }/*,
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        {
           type: MenuItem.Types.LINK,
           payload: 'https://github.com/callemall/material-ui',
           text: 'GitHub'
        },
        {
           text: 'Disabled',
           disabled: true
        },
        {
           type: MenuItem.Types.LINK,
           payload: 'https://www.google.com',
           text: 'Disabled Link',
           disabled: true
        },*/
      ];

class Master extends React.Component{
    constructor(props, context){
      super(props, context);
      this.onToggleLeftNav = this.onToggleLeftNav.bind(this);
      this.onLeftNavChange = this.onLeftNavChange.bind(this);
      this.getSelectedIndex = this.getSelectedIndex.bind(this);
    }
    componentWillMount() {
      require('./Master.css');
    }
    
    onToggleLeftNav(e) {
      this.refs.leftNav.toggle();
    }
    
    onLeftNavChange(e, key, payload) {
      e.preventDefault();
      this.context.history.pushState(null, payload.route, null);
    }
    
    getSelectedIndex() {
      let currentItem;
      for(let i = menuItems.length - 1; i >= 0; i--) {
        currentItem = menuItems[i];
        if (currentItem.route && this.context.history.isActive(currentItem.route, null, true)) {
          return i;
        }
      }
    }
    
    render(){
        return(
            <AppCanvas>
              <div id="wrapper">
                  <div id="header">
                    <AppBar
                      title="Title"
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onLeftIconButtonTouchTap={ this.onToggleLeftNav }/>
                  </div>
                  <div id="content">
                    <LeftNav ref="leftNav" 
                      docked={false} 
                      menuItems={menuItems} 
                      selectedIndex={this.getSelectedIndex()}
                      onChange={this.onLeftNavChange} />
                    {this.props.children}
                  </div>
                  <div id="footer">Hello from footer</div>
              </div>
            </AppCanvas>
        );
    }
}

Master.contextTypes = {
  location: React.PropTypes.object
};

reactMixin.onClass(Master, History);

export default Master;
