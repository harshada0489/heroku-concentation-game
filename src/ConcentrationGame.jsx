import React from 'react';
import './style.scss';

import FlashCard from './FlashCard.js';

import  pic1 from './images/1.png';
import  pic2 from './images/2.png';
import  pic3 from './images/3.png';
import  pic4 from './images/4.png';
import  pic5 from './images/5.png';
import  pic6 from './images/6.png';
import  pic7 from './images/7.png';
import  pic8 from './images/8.png';
import  pic9 from './images/9.png';
import  pic10 from './images/10.png';
import  pic11 from './images/11.png';
import  pic12 from './images/12.png';
import  pic13 from './images/13.png';
import  pic14 from './images/14.png';
import  pic15 from './images/15.png';
import  pic16 from './images/16.png';
import  pic17 from './images/17.png';
import  pic18 from './images/18.png';
import  pic19 from './images/19.png';
import  pic20 from './images/20.png';
import  pic21 from './images/21.png';
import  pic22 from './images/22.png';
import  pic23 from './images/23.png';
import  pic24 from './images/24.png';
import  pic25 from './images/25.png';



let isGameOver = false;

export class ConcentrationGame extends React.Component {
  constructor(props) {
    super(props)
    
    let images = [
      pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,
      pic11,pic12,pic13,pic14,pic15,pic16,pic17,pic18,pic19,pic20,
      pic21,pic22,pic23,pic24,pic25,
    ]

let totalCards= parseInt((this.props.match.params.row * this.props.match.params.col)/2);
console.log("totalCards========", totalCards);


  console.log("images========", images);
  const fronts = [];

    for(var i = 0; i<totalCards; i++){
      let srcImage = images[i];
      console.log("srcImage =======" , srcImage);
      fronts.push(
        <img src={srcImage} className="frontImage"/>
      );
    }
console.log("fronts =======" , fronts);


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
        totalDeckCards : this.props.match.params.row * this.props.match.params.col,
        deck: deck,
        deckMatched: deck.length,
        firstCard: null,
        hintDeck: deck,
        cardFlips : 0,
        successCardFlips: 0,
        failureCardFlips: 0,
        hintCount: 0,
        showHint: true,
        time: {}, 
        seconds: 300,
    
     }

     this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

  }



  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
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

    let noCardFlips = this.state.cardFlips + 1;
    this.setState({cardFlips: noCardFlips});
    console.log("noCardFlips = ", noCardFlips);


    if(this.state.firstCard === null) {
      this.setState({firstCard: cardIdx});
    } else {
      const firstCardContent = this.state.deck[this.state.firstCard].content;
      const secondCardContent = this.state.deck[cardIdx].content;
      if(firstCardContent === secondCardContent) {
        this.setState({firstCard: null});

        let nosuccessCardFlips = this.state.successCardFlips + 2;
        this.setState({successCardFlips: nosuccessCardFlips});
        console.log("nosuccessCardFlips = ", nosuccessCardFlips);

        let nodeckMatched = this.state.deckMatched - 2;
        this.setState({
          deckMatched : nodeckMatched
        })
        
        console.log("deckMatched ******************** ", this.state.deckMatched);
        


      } else {

        let noFailureCardFlips = this.state.failureCardFlips + 2;
        this.setState({failureCardFlips: noFailureCardFlips});
        console.log("noFailureCardFlips = ", noFailureCardFlips);


        setTimeout(() => {
          this.flipCardTo(this.state.firstCard, false)
          this.flipCardTo(cardIdx, false)
          this.setState({firstCard: null});
        }, 2000)
      }
    }

    this.flipCardTo(cardIdx, !this.state.deck[cardIdx].faceUp)
  }


  handleRestart(){
    console.log("Inside restart function");
    window.location.reload();
  }

  handleHin(){
    console.log("Inside hint function ");
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  countDown() {
    // subtracts 1 second, 
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    

    // if sec = 0 alert for game over
    if (seconds === 0) { 
      clearInterval(this.timer);
      // alert("Game Over.You Lost");
    }
  }


 
  componentDidMount(){
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  getNewLine (){
    return(<br />);
  }
  render () {
    console.log(this.state.firstCard);

    const stateRow = parseInt(this.state.row);
    const stateCol = parseInt(this.state.col);


    
console.log("total state * col =" , (stateRow*stateCol)/2);



    const matrix = 
    this.state.deck.map((f, i) => {
      console.log('i='+i +' and f='+f);
      let counter = 0;
      if(counter ===0){
        return (
          <FlashCard
            flip={() => {this.flip(i)}}
            content={f.content}
            faceUp={f.faceUp} /> 
            
        )
      }
      else{
        return (
           
          <FlashCard
            flip={() => {this.flip(i)}}
            content={f.content}
            faceUp={f.faceUp} />  
        )
      } 
        
      })


      const hintMatrix = 
    this.state.deck.map((f, i) => {
        return (
          <FlashCard
            flip={() => {this.flip(i)}}
            content={f.content}
            faceUp= 'true' />)
      })

    let noCardFlips = this.state.cardFlips;
    let noSuccessCardFlips = this.state.successCardFlips;
    let noFailureCardFlips = this.state.failureCardFlips;
    let noHintCount = this.state.hintCount;


    let matchPairFinised = this.state.deckMatched
    // if(matchPairFinised === 0){
    //   alert("You Won the game");
    // }


    // if sec = 0 alert for game over
    if (this.state.seconds === 0 && matchPairFinised !== 0 && isGameOver=== false) { 
      clearInterval(this.timer);

      isGameOver = true;
      alert("Game Over.You Lost");

    }else if(this.state.seconds !== 0 && matchPairFinised === 0 && isGameOver === false) { 
      clearInterval(this.timer);
      isGameOver = true;
      alert("Game Over.You Won");
  }



            return(
              
            <div>
              

                <h1>Welcome to Concentration Game</h1>
               

                 <h4> Card Flips: {noCardFlips}  &nbsp; &nbsp; &nbsp; &nbsp; 
                  Success Card Flips: {noSuccessCardFlips} &nbsp; &nbsp; &nbsp; &nbsp; 
                  Failure Card Flips: {noFailureCardFlips} &nbsp; &nbsp; &nbsp; &nbsp; 
                  Hint Count: {noHintCount}</h4>
                    <div>
                      m: {this.state.time.m} s: {this.state.time.s}
                    </div>
                   
                    {
                          this.state.show? <div>{hintMatrix}</div> : <p>{matrix}</p>
                    }

                <div className="AllButtons">
                    <button type="button"  onClick={this.handleRestart} className="btn">
                        Restart Game
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    {
                          this.state.hintCount< 3 
                          ? 
                            <button type="button"  onClick={()=>{
                              this.setState({
                                show: !this.state.show, 
                                })
                                
                                setTimeout(() => {
                                  this.setState({
                                  show: !this.state.show, 
                                  hintCount: this.state.hintCount + 1
                                })
                                }, 1000)

                                }} className="btn">
                              Hint
                          </button>
                          :  
                          <div></div>
                    }


                </div>
                    

            </div>
        );


  }
}

export default ConcentrationGame;