import React, { Component } from "react";
import "./CommentBox.css";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      comments: [
        //   {id: 1, author: "Vishal", body: "It might be awkward, but please don't scroll past this. This Wednesday, for the 1st time recently, we humbly ask you to defend Wikipedia's independence. 98% of our readers don't give; they simply look the other way. If you are an exceptional reader who has already donated, we sincerely thank you. If you donate just ₹ 150, Wikipedia could keep thriving for years. Most people donate because Wikipedia is useful. If Wikipedia has given you ₹ 150 worth of knowledge this year, take a minute to donate. Show the volunteers who bring you reliable, neutral information that their work matters. Thank you."},
        //   {id: 2, author: "Rahul", body: "It might be awkward, but please don't scroll past this. This Wednesday, for the 1st time recently, we humbly ask you to defend Wikipedia's independence. 98% of our readers don't give; they simply look the other way. If you are an exceptional reader who has already donated, we sincerely thank you. If you donate just ₹ 150, Wikipedia could keep thriving for years. Most people donate because Wikipedia is useful. If Wikipedia has given you ₹ 150 worth of knowledge this year, take a minute to donate. Show the volunteers who bring you reliable, neutral information that their work matters. Thank you."},
        //   {id: 3, author: "Bittu", body: "It might be awkward, but please don't scroll past this. This Wednesday, for the 1st time recently, we humbly ask you to defend Wikipedia's independence. 98% of our readers don't give; they simply look the other way. If you are an exceptional reader who has already donated, we sincerely thank you. If you donate just ₹ 150, Wikipedia could keep thriving for years. Most people donate because Wikipedia is useful. If Wikipedia has given you ₹ 150 worth of knowledge this year, take a minute to donate. Show the volunteers who bring you reliable, neutral information that their work matters. Thank you."}
      ],
    };
  }
  componentDidMount() {
    this.setState({ showComments: true });
    const url = "http://localhost:7070/api/comments/";
    const endpoint = `${url}${this.props.movieId}`;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          comments: [...response],
          showComments: false,
        });
      })
      .then((response) => console.log(this.state.comments))
      .catch((error) => console.error("Error:", error));
  };
  render() {
    const comments = this.getComments();
    let commentNodes;
    let buttonText = "Show Comments";

    if (this.state.showComments) {
      buttonText = "Hide Comments";
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="comment-box">
        <h2>Join the Discussion!</h2>
        <CommentForm writeComment={this.writeComment.bind(this)} />

        <div>
          <button id="comment-reveal" onClick={this.handleClick.bind(this)}>
            {buttonText}
          </button>
        </div>

        <h4 className="comment-count">
          {this.getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>
    );
  } // end render

  writeComment(userName, addComment) {
    const comment = {
      id: this.state.comments.length + 1,
      movieId: this.props.movieId,
      userName: userName,
      addComment: addComment,
    };
    this.setState({ comments: this.state.comments.concat([comment]) }, () =>
      console.log(comment)
    );
    console.log(this.state.comments);
    const url = "http://localhost:7070/api/comments";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser")
      );
  }

  handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          userName={comment.userName}
          addComment={comment.addComment}
          key={comment.id}
        />
      );
    });
  }

  getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
} // end CommentBox component

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input
            placeholder="Enter you Name"
            required
            ref={(input) => (this._userName = input)}
          ></input>
          <br />
          <textarea
            placeholder="Comment"
            rows="4"
            required
            ref={(textarea) => (this._addComment = textarea)}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          <button className="post-comment" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  } // end render

  handleSubmit(event) {
    event.preventDefault();
    let userName = this._userName;
    let addComment = this._addComment;
    this.props.writeComment(userName.value, addComment.value);
  }
} // end CommentForm component

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.userName}</p>
        <p className="comment-body">- {this.props.addComment}</p>
      </div>
    );
  }
}
export default CommentBox;
