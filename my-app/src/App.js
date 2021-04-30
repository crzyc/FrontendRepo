import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
	  isShow: false,
    };
	this.createText = this.createText.bind(this);
    this.condrender = this.condrender.bind(this);
  }

createText(){
	this.setState({isShow: !this.state.isShow});
}

condrender() {
   const items = this.state.items;
   return (
	<div class="outlineBox">
		<p class="title">Sample Text1</p>
			{items.map(item => (
				<li key={item}>
					<img src={item} width="200" height="400" />
				</li>
			))}
	</div>
   ); 
 }


  componentDidMount() {
    const publicServerUrl = 'http://ec2-18-222-100-185.us-east-2.compute.amazonaws.com';
    const localServerUrl = 'http://localhost';
    // fetch(localServerUrl + ":3000/api/instagram/edsheerantopfivephotourls")
    fetch(publicServerUrl + ":3000/api/instagram/edsheerantopfivephotourls")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.photos
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    const items = this.state.items;

    console.log(items)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
	<div class="background">
        My favorite Images
		<button onClick={this.createText}>Click</button>
		{/*too lazy to move this properly for now*/}
        <div class="horizontalarrange">
			<div className="App">	
				{this.state.isShow ? this.condrender() : null}
			</div>
		</div>
    </div>
      );
    }
  }
}

export default App;
