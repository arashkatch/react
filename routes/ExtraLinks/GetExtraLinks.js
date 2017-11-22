/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import s from './GetExtraLinks.css';

class AboutPage extends React.Component {

  // componentDidMount() {
  //   document.title = title;
  // }
  

  render() {
    return (
      <Layout className={s.content}>
        <Counter/>
        <FilteredList />
      </Layout>
      
    );
  }

}

export default AboutPage;


///////

var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div class="my-component">
        <h1>Count: {this.state.count}</h1>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});


// reference : data flow https://scotch.io/tutorials/learning-react-getting-started-and-concepts

var FilteredList = React.createClass({
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
   
     return {
       initialItems:
        [
         "Apples",
         "Broccoli",
         "Chicken"
       ]
       ,
       items: []
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  componentDidMount() {    
    var that = this;
    var url = 'https://api.github.com/users/mojombo'
  
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({ user: data.name, avatar_url: data.avatar_url });
    });
  },
  render: function(){
    return (
      <div className={s.filteredList}>
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      <div>{this.state.user}</div>
      <div>{this._renderAsImage()}</div>
      </div>
    );
  },

  _renderAsImage : function(){
    return (
        <img width= "100px"
            height= "100px"
            src={this.state.avatar_url}
        />
    )
}

});

//-----------------------  list class
var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )  
  }
});
