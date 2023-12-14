import { useState } from 'react';
import '../styles/Robot.css';
import robotImg from '../images/robot.jpg';

const ToyRobot = ({ gridSize }) => {
    const [position, setPosition] = useState({ x: null, y: null, f: null });
    const [report, setReport] = useState('');
    const [command, setCommand] = useState('');
    // Command enter function
    const handleCommand = () => {
        const [commandval, args] = command.split(' ');
        switch (commandval.toUpperCase()) {
            case 'PLACE':
                if (args) {
                    const [x, y, f] = args.split(',');
                    placeRobot(x, y, f);
                }
                break;
            case 'MOVE':
                moveRobot();
                break;
            case 'LEFT':
                rotateLeft();
                break;
            case 'RIGHT':
                rotateRight();
                break;
            case 'REPORT':
                reportRobot();
                break;
            default:
                break;
        }
    };
    // place command function
    const placeRobot = (x, y, f) => {
        if (isValidPosition(x, y, f)) {
            setPosition({ x: parseInt(x), y: parseInt(y), f });
            setCommand('');
        }
    };
    //  move command function
    const moveRobot = () => {
        const { x, y, f } = position;
        if (isValidPosition(x, y, f)) {
            let directionX = x;
            let directionY = y;
            switch (f.toUpperCase()) {
                case 'NORTH':
                    directionY = y < 4 ? y + 1 : y;
                    break;
                case 'SOUTH':
                    directionY = y > 0 ? y - 1 : y;
                    break;
                case 'EAST':
                    directionX = x > 0 ? x - 1 : x;
                    break;
                case 'WEST':
                    directionX = x < 4 ? x + 1 : x;

                    break;
                default:
                    break;
            }
            setPosition({ x: directionX, y: directionY, f });
        }
       
        setCommand('');
    };
    // Left command function
    const rotateLeft = () => {
        if (isValidPosition(position.x, position.y, position.f)) {
            const { f } = position;
            const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
            const currentIndex = directions.indexOf(f);
            const newDirection = currentIndex < 3 ? directions[currentIndex + 1] : directions[0];
            setPosition({ ...position, f: newDirection });
            setCommand('');
        }
    }
    // Right command function
    const rotateRight = () => {
        if (isValidPosition(position.x, position.y, position.f)) {
            const { f } = position;
            const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
            const currentIndex = directions.indexOf(f);
            const newDirection = currentIndex < 3 ? directions[currentIndex + 1] : directions[0];
            setPosition({ ...position, f: newDirection });
            setCommand('');
        }
    }
    // Report command function
    const reportRobot = () => {
        if (isValidPosition(position.x, position.y, position.f)) {
            setReport(position);
            setCommand('');
        }
    }

    const isValidPosition = (x, y, f) => {
        return x !== null && y !== null && f !== null;
    }
    return (
        <>
            <div className="robot_continer" >
                {[...Array(gridSize)].map((_, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {[...Array(gridSize)].map((_, colIndex) => (
                            <div key={colIndex} className='grid-cell'>
                                {position.x === colIndex && position.y === rowIndex && (
                                    <img src={robotImg} alt="robot" className={`robot ${position.f.toLowerCase()}`} />
                                )}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
            <div className='controls'>
                <label>
                    Command:
                    <input type='text' onChange={(e) => setCommand(e.target.value)}
                        value={command}
                        placeholder='Enter Command ....'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCommand(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                </label>
                {report &&
                    <div>
                        <p>Current Position:</p>
                        <p>X: {report.x}</p>
                        <p>Y: {report.y}</p>
                        <p>Direction: {report.f.toUpperCase()}</p>
                    </div>
                }

            </div>
        </>
    )
}
export default ToyRobot;