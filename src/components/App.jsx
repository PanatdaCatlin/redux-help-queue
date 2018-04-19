import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import { Switch, Route } from 'react-router-dom';
import NewTicketForm from './NewTicketForm';
import reallyAdorablePuppy from '../assets/images/puppy.jpg';
import Error404 from './Error404';

function App(){
  return(
    <div>
      <Header/>
      <img width= '450' src={reallyAdorablePuppy}/>
      <Switch>
        <Route exact path='/' component={TicketList} />
        <Route path='/newticket' component={NewTicketForm} />
        <Route component={Error404} />
      </Switch>

    </div>
  );
}

export default App;
