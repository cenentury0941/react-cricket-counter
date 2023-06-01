import React, {useState} from 'react';
import './CricketCounter.css'
import calc from '../images/ball.png'


var balls = 0, playable = true, wicketsInstant = 0;

export function CricketCounter()
{
    const [ runs , setRuns ] = useState(0);
    const [ wickets , setWickets ] = useState(0);
    const [ Score , setScore ] = useState( [] );
    const [ BallsPlayed, setBallsPlayed ] = useState(0);


    function checkEndGame()
    {
        if( balls == 30 || wicketsInstant == 10  )
        {
            playable = false;
        }
        else{
            playable = true;
        }
    }

    function scoreClick(val)
    {
        if( !playable )
        {
            return;
        }
        console.log( "Score : " + val );
        setRuns( runs+val );
        var sc = Score.reverse();
        sc.push( ""+val );
        setScore(sc.reverse());
        console.log( sc );
        setBallsPlayed( BallsPlayed+1 );
        balls+=1;
        checkEndGame();
    }

    function wideBall()
    {
        if( !playable )
        {
            return;
        }
        console.log( "Wide Ball" );
        setRuns( runs+1 );
        var sc = Score.reverse();
        sc.push( "WB" );
        setScore(sc.reverse());
        console.log( sc );
        setBallsPlayed( BallsPlayed+1 );
        checkEndGame();
    }

    function noBall()
    {
        if( !playable )
        {
            return;
        }
        console.log( "No Ball" );
        var sc = Score.reverse();
        sc.push( "NB" );
        setScore(sc.reverse());
        console.log( sc );
        setBallsPlayed( BallsPlayed+1 );
        checkEndGame();
    }

    function wicket()
    {
        if( !playable )
        {
            return;
        }
        setWickets( wickets+1 );
        wicketsInstant += 1 ;
        console.log( "Wicket" );
        var sc = Score.reverse();
        sc.push( "WK" );
        setScore(sc.reverse());
        console.log( sc );
        setBallsPlayed( BallsPlayed+1 );
        balls += 1;
        checkEndGame();
    }

    function reset()
    {
        setRuns(0);
        setWickets(0);
        setScore([]);
        balls = 0;
        checkEndGame();
    }

    return (
        <div className='CalculatorBody'>
            <span className='CalculatorHeading'><img src={calc}></img>Scoreboard</span>
            <div className='DisplayScorecards'>
                    {
                        Score.map( (element,index) => ( <div className={ 'Scorecard ' + ( (element === "WB" || element === "NB") ? "OperatorButton" : ( ( element === "WK" ) ? "ClearButton" : "" ) ) } key={""+element+index}>{element}</div> ) )
                    }
            </div>
            <div className='Display'>{runs}/{wickets} of { Math.floor(balls/6) }.{ Math.floor(balls%6) } Overs</div>
            <div className='ButtonLayout'>
                <div className='ButtonRow'>
                    <div className='Button' onClick={ () => { scoreClick(1) } }>1</div>
                    <div className='Button' onClick={ () => { scoreClick(2) } }>2</div>
                    <div className='Button' onClick={ () => { scoreClick(3) } }>3</div> 
                    <div className='Button' onClick={ () => { scoreClick(4) } }>4</div> 
                    <div className='Button' onClick={ () => { scoreClick(5) } }>5</div> 
                </div>
                
                <div className='ButtonRow'>
                    <div className='Button' onClick={ () => { scoreClick(6) } }>6</div>
                    <div className='Button' onClick={ () => { scoreClick(0) } }>0</div>
                    <div className='Button OperatorButton' onClick={ () => { wideBall() } }>WB</div>
                    <div className='Button OperatorButton' onClick={ () => { noBall() } }>NB</div>
                    <div className='Button ClearButton' onClick={ () => { wicket() } }>WK</div>  
                </div>

                <div className='ButtonRow'>
                    <div className='Button ResetButton' onClick={ () => { reset() } }>Reset</div>  
                </div>
            </div>
            
            { !playable && <div className='MessageBox'><h2>Game has ended.</h2></div> }

        </div>
    );
}


export default CricketCounter;