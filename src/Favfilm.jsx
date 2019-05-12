import React from 'react';
import './App.css';

class FavFilm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      poster: '',
      comment: '',
    }

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    const url = "http://campus-bordeaux.ovh:3001/api/quests/movies/";

    if (this.state.name === "" || this.state.poster === "" || this.state.comment === "") {
      alert('Please fill all the fields :)!')
    } else {
      fetch(url, config)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            alert(`Your favorite film was Added and it's the num. ${res}!`);
          }
        })
        .catch(e => {
          console.error(e);
          alert('Error sorry!');
        });
      this.setState({
        name: '',
        poster: '',
        comment: ''
      })
    }
  }


  render() {
    return (
      <div className="FormFavFilm">
        <h1 className="title">Share your favorite film</h1>

        <form clasName="form" onSubmit={this.submitForm}>
            <legend className="legend">Feel free to add your favorite film!</legend>
            <div className="form-data">
              <label htmlFor="name">Favorite film</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>

            <div className="form-data">
              <label htmlFor="poster">Url of the film</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
              />
            </div>

            <div className="form-data">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                name="comment"
                onChange={this.onChange}
                value={this.state.comment}>
              </textarea>
            </div>

            <div className="form-data">
              <input  className="button" type="submit" value="Send" />
            </div>
        </form>
      </div>
    )
  }

}

export default FavFilm;