import React, { useState } from 'react';
import {
BrowserRouter as Router, 
Route, 
Link, 
Switch,
useRouteMatch,
useParams} from "react-router-dom";
import './App.css';
import data from "./data/data.json";
//import Home from './components/Home';
//import Users from './components/Users';

function App() {
  const [persons,setPersons] = useState(data);
  return (
    <Router>
   	  <div>
         <h1>Welcome to our friends site</h1>
         
       <Nav nav = {Nav} />
       {/* <Swi switchies = {Swi} /> */}
       <Swi persons = {persons} />
      </div>
    </Router>

  );
}

const Nav = () => {
  return (
     <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all">See all users</Link>
          </li>
        </ul>
     </nav>
  );
}

const Swi = (props) => {
  return (
    <Switch>
      {console.log(props.persons)}
    <Route path="/all">
      <Users persons={props.persons}/>
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Users( {persons},props ) {
  let match = useRouteMatch();
   //console.log(persons);
  //console.log(persons.users[0]);
    //console.log(persons[0]); 
    const pers1ob = persons.users[0];
    const pers2ob = persons.users[1];
    const pers3ob = persons.users[2];
    /* const pers1 = persons.users.map(p=>(
    <td key={p.zip}>{p.first}</td>
  )); */
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Details</th>
       </tr>
      <tr>
        <td><img src = {pers1ob.picture.thumbnail}/></td>
        <td>{pers1ob.first + " " +pers1ob.last}</td>
        <td><Link to={`${match.url}/User1`}>Details</Link></td>
      </tr>
      <tr>
       <td><img src = {pers2ob.picture.thumbnail}/></td>
       <td>{pers2ob.first + " " +pers2ob.last}</td>
       <td>
          <Link to={`${match.url}/User2`}>Details</Link>
       </td>
      </tr>
      <tr>
      <td><img src = {pers3ob.picture.thumbnail}/></td>
      <td>{pers3ob.first + " " +pers3ob.last}</td>
      <td>
        <Link to={`${match.url}/User3`}>Details</Link>
      </td>
      </tr>
      <tr>
        <td>
        <Link to={`${match.url}/`}>Backtest</Link>
        </td>
      </tr>
      </thead>
      </table>
      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:userId`}>
          <User persons={persons}/>
        </Route>
        <Route path="/">
          <h3>Back.</h3>
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function User({persons}) {
  let { userId } = useParams();
  console.log(persons);
  const pers1ob = persons.users[0];
  const pers2ob = persons.users[1];
  const pers3ob = persons.users[2];
  console.log(pers1ob);
  console.log(JSON.parse(JSON.stringify(pers1ob)));
  function which(){
    if(userId==='User1'){
      return pers1ob;
    }if(userId==='User2'){
      return pers2ob;
    }else{
      return pers3ob;
    }
  }
  

  return (
    <p>{userId}<pre>{JSON.stringify(which(), undefined, 2)}</pre>
    <img src = {which().picture.large}/>
    </p>
    
  
  
  );
}


/* const Routerz =()=>{
  return(
    <div>
      <Route path = "/" component = {Home} exact />
         <Route path = "/all" component ={Users}/>
         <Route path = "/details"/>
    </div>

  );
} */
//<Routerz rout ={Routerz} />
export default App;
