import React from "react";
import axios from "axios";
import JokeClass from "./JokeClass";
import "./JokeList.css";

class JokeListClass extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
        super(props);
        this.state = {
          jokes: []
        };
        this.addJokes = this.addJokes.bind(this);

    }


    componentDidMount(){
      this.getData();
     }
   
     componentDidUpdate() {
       if (this.state.jokes.length < this.props.numJokesToGet) this.getData();
     }
    
    async getData() {
      let j = this.state.jokes;
      
      try{
        while (j.length < this.props.numJokesToGet){
          let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
      });
      let { status, ...jokeObj } = res.data;
          console.log('res.data is: ', res.data);
          
          j.push({ ...jokeObj, votes: 0 });
        
    }
    console.log("j in getData", j);
    this.setState({j})
  } catch (e) {
        console.log(e);
      }
    }


    vote(id, delta) {
      let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"));
      jokeVotes[id] = (jokeVotes[id] || 0) + delta;
      window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
      this.setState(st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }));
    }

    addJokes() {
        this.setState({jokes: []});
        console.log("this.state.jokes is: ", this.state.jokes)
        console.log("length is: ",this.state.jokes.length);
    }
    
    render() {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
        return(
        <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.addJokes}>
          Get New Jokes
        </button>
        {sortedJokes.map(j => (
        <JokeClass text={j.joke} key={j.id} votes={j.votes} id={j.id} vote={this.vote}/>
        ))}
        </div>
        )
    }
}

export default JokeListClass;