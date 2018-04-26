import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import { Switch, Route } from 'react-router-dom';
import NewTicketControl from './NewTicketControl';
import reallyAdorablePuppy from '../assets/images/puppy.jpg';
import Error404 from './Error404';
import Moment from 'moment';
import Admin from './Admin';
import { v4 } from 'uuid';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
    clearInterval(this.waitTimeUpdateTimer);
  }
// additional lifecycle methods
  // componentWillMount() {
  //   console.log('componentWillMount');
  // }
  //
  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps');
  // }
  //
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   return true;
  // }
  //
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }
  //
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

    updateTicketElapsedWaitTime() {
      console.log('check');
      let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
      Object.keys(newMasterTicketList).forEach(ticketId => {
        newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
      });
      this.setState({masterTicketList: newMasterTicketList});
    }
  handleAddingNewTicketToList(newTicket){
    newTicket.id = v4();
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
    [newTicket.id]: newTicket
  });
  newMasterTicketList[newTicket.id].formattedWaitTime = newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
  this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    return(
      <div>
        <Header/>
        <img width= '450' src={reallyAdorablePuppy}/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList} />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname}
            onTicketSelection={this.handleChangingSelectedTicket}
            selectedTicket={this.state.selectedTicket} />} />
          <Route component={Error404} />
        </Switch>

      </div>
    );
  }
}

export default App;
