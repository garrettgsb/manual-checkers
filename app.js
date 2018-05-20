import React from 'react';
import ReactDOM from 'react-dom';
import initialLayout from './initialLayout.json';

const debugMode = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.layout = [...initialLayout];
  }

  updateLayout(cellCoords, pieceCoords, val, action) {
    let layout = this.state.layout;
    if (action === 'move') {
      layout = this.move(cellCoords, pieceCoords, val);
    } else if (action === 'dblClick') {
      layout = this.dblClick(cellCoords);
    }
    this.setState({layout});
  };

  dblClick (cellCoords) {
    const layout = this.state.layout;
    const cell = layout[cellCoords[0]][cellCoords[1]];
    if (cell === 0) { layout[cellCoords[0]][cellCoords[1]] = 1 }
    else if (cell === 1) { layout[cellCoords[0]][cellCoords[1]] = 2 }
    else if (cell === 2) { layout[cellCoords[0]][cellCoords[1]] = 0 }
    return layout;
  }

  move(cellCoords, pieceCoords, val) {
    const layout = this.state.layout;
    if (layout[cellCoords[0]][cellCoords[1]] === 0) {
      layout[cellCoords[0]][cellCoords[1]] = val;
      layout[pieceCoords[0]][pieceCoords[1]] = 0;
    }
    return layout;
  }

  render() {
    return (
      <div>
        <Checkerboard layout={this.state.layout} updateLayout={this.updateLayout.bind(this)} />
      </div>
    );
  }
};

const Checkerboard = ({layout, updateLayout}) => {
  const width = 8;
  const height = 8;
  return (
    <div className='checkerboard'>
      { layout.map((row, i) => <CheckerboardRow width={width} key={i} ri={i} rowData={row} updateLayout={updateLayout} />) }
    </div>
  )
}

const CheckerboardRow = ({width, ri, rowData, updateLayout}) => {
  return (
    <div className='checkerboard-row'>
      { rowData.map((cell, i) => <CheckerboardCell key={i} ci={i} ri={ri} cellData={cell} updateLayout={updateLayout} />) }
    </div>
  );
};

const CheckerboardCell = ({ci, ri, cellData, updateLayout}) => {
  const color = (ci + ri) % 2 === 0 ? 'light' : 'dark';
  return (
    <div className={`checkerboard-cell ${color}`}
      onDragEnter={(e) => color === 'dark' && e.target.classList.add('cell-drag')}
      onDragLeave={(e) => color === 'dark' && e.target.classList.remove('cell-drag')}
      onDragOver={(e) => e.preventDefault() /* Whole thing breaks without this for some reason 😬 */}
      onDrop={(e) => {
        const obj = JSON.parse(e.dataTransfer.getData('text/plain')); // Yes, this needs to be JSON. 🙄
        color === 'dark' && updateLayout([ri, ci], obj.pos, obj.val, 'move');
        e.target.classList.remove('cell-drag');
      }}
      onDoubleClick={(e) => color === 'dark' && updateLayout([ri, ci], null, null, 'dblClick')}
    >
      { cellData === 1 && <Checker color='light' pos={[ri, ci]} val={cellData} />}
      { cellData === 2 && <Checker color='dark' pos={[ri, ci]} val={cellData} />}
      { debugMode && <p>{ri}, {ci}</p> }
    </div>
  );
};

const Checker = ({color, pos, val}) => {
  const colorClass = color === 'light' ? 'checker-light' : 'checker-dark';
  return (
    <div className={`checker ${colorClass}`} draggable='true'
      onDragStart={(e) => {
        e.target.classList.toggle('checker-drag');
        e.dataTransfer.setData('text/plain', JSON.stringify({ pos, val })); // Yes, this needs to be JSON. 🙄
      }}
      onDragEnd={(e) => e.target.classList.toggle('checker-drag')}
    ></div>
  )
}

export default App;
