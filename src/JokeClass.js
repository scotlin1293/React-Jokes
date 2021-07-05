import React from "react";
import "./Joke.css";


class JokeClass extends React.Component {
    // constructor({ vote, votes, text, id }) {
    constructor(props) {
        super(props);
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)

      
    }

    upVote() {this.props.vote(this.props.id, +1);}
    downVote() { this.props.vote(this.props.id, -1);}


    render() {
        return (
          
      <div className="Joke">
        <div className="Joke-votearea">
            <button>
              <button onClick={this.upVote}>
              <i className="fas fa-thumbs-up"/>
              </button>
              <button onClick={this.downVote}>
              <i className="fas fa-thumbs-down"/>
              </button>
            </button>
            {this.props.votes}
          <div className="Joke-text">{this.props.text}</div>
      </div>
      </div>
        )
       }
    }

export default JokeClass;