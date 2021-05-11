import React from 'react';
import './style.scss';

// import pic1 from "./images/pic1.png";
// import pic2 from "./images/pic2.png";
// import pic3 from "./images/pic3.png";
// import pic4 from "./images/pic4.png";
// import pic5 from "./images/pic5.png";
// import pic6 from "./images/pic6.png";
// import pic7 from "./images/pic7.png";
// import pic8 from "./images/pic8.png";
// import pic9 from "./images/pic9.png";
// import pic10 from "./images/pic10.png";

import FlashCard from './FlashCard.js';
// import './Board.css';

export class ConcentrationGame extends React.Component {
  constructor(props) {
    super(props)
    

    const fronts = [
    //   '💩',
    //   '👹',
    //   '👿',
    //   '🧠',
    //   '🚗',
    //   '🚲',
    //   '🚂',
    //   '🧸',
    //   '🤨',
    //   '🤟',
    //   '♥️',
    //   '🦟',
    //   '🦨',
      'A',
      'B',
      'C',
      'D'
    ]

    const deck = fronts
      .concat(fronts)
      .sort(() => Math.random() - 0.5)
      .map(f => {
        return {
          content: f,
          faceUp: false,
        }
      })


      this.state={
        row : this.props.match.params.row,
        col : this.props.match.params.col,
        deck: deck,
        firstCard: null,
        hintDeck: deck,
        cardFlips : 0,
        successCardFlips: 0,
        failureCardFlips: 0
     }


  }

  flipCardTo(cardIdx, faceUp) {
    this.setState({
      deck: this.state.deck.map((f, i) => {
        if(i === cardIdx) {
          return {
            content: f.content,
            faceUp: !f.faceUp,
          }
        } else {
          return f;
        }
      })
    })
  }

  flip(cardIdx) {


    // cardFlips
    //     successCardFlips
    //     failureCardFlips


    if(this.state.firstCard === null) {
      this.setState({firstCard: cardIdx});
    } else {
      const firstCardContent = this.state.deck[this.state.firstCard].content;
      const secondCardContent = this.state.deck[cardIdx].content;
      if(firstCardContent === secondCardContent) {
        this.setState({firstCard: null});
      } else {
        setTimeout(() => {
          this.flipCardTo(this.state.firstCard, false)
          this.flipCardTo(cardIdx, false)
          this.setState({firstCard: null});
        }, 3000)
      }
    }

    this.flipCardTo(cardIdx, !this.state.deck[cardIdx].faceUp)
  }


  handleRestart(){
    console.log("Inside restart function");
    window.location.reload();
  }

  handleHint(){
    console.log("Inside hint function");
    
    console.log("isHint = ", this.state.isHint);

  }

  render () {
    console.log(this.state.firstCard);

    const stateRow = parseInt(this.state.row);
    const stateCol = parseInt(this.state.col);

    const cardFlips = this.state.col;
    const successCardFlips = this.state.col;
    const failureCardFlips = this.state.col;
    
    

    const matrix = 
    this.state.deck.map((f, i) => {
        return (<div className="Board">
          <FlashCard
            flip={() => {this.flip(i)}}
            content={f.content}
            faceUp={f.faceUp} />
        </div>)
      })


            return(
            <div>
                This is Concentration Game Component: row = {stateRow} and col = {stateCol} 
                 <h4> Card Flips: </h4>
                 <h4> Success Card Flips: </h4>
                 <h4> Failure Card Flips: </h4>
            
                    {matrix}

                <div className="AllButtons">
                    <button type="button"  onClick={this.handleRestart} className="btn">
                        Restart Game
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button"  onClick={this.handleHint} className="btn">
                        Hint
                    </button>
                </div>
                    

            </div>
        );


  }
}

export default ConcentrationGame;