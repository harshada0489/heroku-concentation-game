import React from 'react';
import './style.scss';
import bunny from "./images/bunny.png";

export class ConcentrationGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            row : this.props.match.params.row,
            col : this.props.match.params.col,
            tableRow : [],

        }

    }



    componentDidMount(){


        for(var i=0; i<this.state.row; i++){
            //for getting rows array
              this.setState({
                tableRow: [
                ...this.state.tableRow,
                this.state.tableRow.push(i + 1)
                ]
                });


        }
        
    }


  
    render(){
        console.log("this.state.tableRow  =" , this.state.tableRow);

        console.log("state row value =" , this.state.row);
        console.log("state col value =" , this.state.col);

        const stateRow = parseInt(this.state.row);
        const stateCol = parseInt(this.state.col);

        

        
        const matrix = Array.apply(null, Array(stateRow))
        .map(function (x, i) {
          const col = Array.apply(null, Array(stateCol))
            .map(function (y, j) {
                return (<div className="card">
                    {/* <div class="card-back card-face">
                    </div> */}
                    <div  className="card-front card-face" >
                        <img className="image" src={bunny} >

                        </img>
                    </div>
                </div>
                );
            });
      
          return <div className="rec-col" >{col}</div>;
        });
      
    


        return(
            <div>
                This is Concentration Game Component: row = {stateRow} and col = {stateCol}
            
                    {matrix}


            </div>
        );
    }


}