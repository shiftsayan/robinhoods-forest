import { Stage } from 'react-konva';
import ForestLand from './ForestLand';
import ForestTrees from './ForestTrees';

function Forest(props) {
  return (
    <Stage width={window.innerWidth} height={230}>
      <ForestLand
        dimension={5}
      />
      <ForestTrees 
        dimension={5}
        map={{
          0:{
            0: ['tree1', true],
          },
          1:{
            0: ['tree1', true],
            1: ['tree1', true],
          },
          2:{
            0: ['', true],
            1: ['tree1', true],
            2: ['', true],
          },
          3:{
            0: ['tree2', true],
            1: ['', true],
            2: ['', false],
            3: ['', true],
          },
          4:{
            0: ['tree2', true],
            1: ['tree2', true],
            2: ['', true],
            3: ['', true],
            4: ['tree4', true],
          },
          5:{
            0: ['', true],
            1: ['', true],
            2: ['tree3', true],
            3: ['', true],
          },
          6:{
            0: ['', true],
            1: ['tree3', true],
            2: ['tree3', true],
          },
          7:{
            0: ['tree5', true],
            1: ['tree3', true],
          },
          8:{
            0: ['', true],
          },
        }}
      />
    </Stage>
  );
}

export default Forest;
