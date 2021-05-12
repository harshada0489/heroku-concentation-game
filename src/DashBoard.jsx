import './App.scss';
import React from 'react';
// import { Switch, Route, BrowserRouter} from "react-router-dom";

export class DashBoard extends React.Component{

    constructor(props){

        super(props);
        this.state ={
          inputRow : 2,
          inputCol : 2
        }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      handleChange(event){
        console.log("Inside handleChange");
    
        this.setState({
        [event.target.name]: event.target.value
     });
   }
  
   handleSubmit(){
      console.log("Inside handleSubmit");
      console.log("props values = ", this.props.match.params.row);
  
         this.props.history.push({
          pathname: "/startGame/row/"+ this.state.inputRow + "/col/" + this.state.inputCol,
        });
        
   }
   

   render(){
       return(
            <div>
            <div className="header"><h1>Concentration Game</h1></div>

                    <div className="form">
                        <div className="form-group">
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="inputRow">Rows</label>
                            </div>
                            <div className="col-75">
                                <input type="number" max="7" name="inputRow" min="2" value={this.state.inputRow} onChange={this.handleChange} placeholder="Enter no. of rows" />
                            </div>
                        </div>

                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-25">
                                <label htmlFor="inputCol">Column</label>
                                </div>
                                <div className="col-75">
                                <input type="number" max="7" name="inputCol"  min="2" value={this.state.inputCol} onChange={this.handleChange} placeholder="Enter no. of columns" />
                                </div>
                            </div>
                        </div>

                        <button type="button"  onClick={this.handleSubmit} className="btn">
                        Start Game
                        </button>
                    </div>
            </div>  


       );
   }
   



}

  