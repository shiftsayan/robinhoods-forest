import { Layer, Image as KonvaImage, Group } from 'react-konva';
import { range, get } from "../util";
import tree1 from "../assets/tree1.png";
import tree2 from "../assets/tree2.png";
import tree3 from "../assets/tree3.png";
import tree4 from "../assets/tree4.png";
import tree5 from "../assets/tree5.png";
import { useState } from 'react';

const TILE_WIDTH = 62
const TILE_HEIGHT = 62

function ForestTree(props) {
  var [ scale, setScale ] = useState(0.26)
  setTimeout(() => setScale(props.grow ? 0.3 : 0.22), (props.grow ? 2000 : 3000) + Math.random() * 500)
  return (
    <KonvaImage
      image={props.tree}
      x={props.row_starting_x + TILE_WIDTH * props.col_number + (TILE_WIDTH/2 - scale * props.tree.width/2)}
      y={TILE_HEIGHT/2 + TILE_HEIGHT/4 * props.row_number - scale * props.tree.height/2}
      scaleX={scale}
      scaleY={scale}
    />
  )
}

function ForestTrees(props) {
  var row_numbers = range(props.dimension*2 - 1)
  var rows = row_numbers.map(
    function(row_number) {
      var total_columns = Math.min(row_number + 1, props.dimension*2 - row_number - 1)
      var row_starting_x = window.innerWidth/2 - TILE_WIDTH * total_columns/2
      var col_numbers = range(total_columns)
      var cols = col_numbers.map(
        function(col_number) {
          var tree = new Image()
          var [ source, grow ] = get(get(props.map, row_number), col_number)
          switch(source) {
            case 'tree1':
              tree.src = tree1
              break
            case 'tree2':
              tree.src = tree2
              break
            case 'tree3':
              tree.src = tree3
              break
            case 'tree4':
              tree.src = tree4
              break
            case 'tree5':
              tree.src = tree5
              break
            default:
              tree.src = ''
              break
          }
          return (
            tree.src ?
            <ForestTree
              tree={tree}
              grow={grow}
              row_starting_x={row_starting_x}
              row_number={row_number}
              col_number={col_number}
            /> :
            <></>
          )
        }
      )
      return cols
    }
  )
  return (
    <Layer>
      <Group>
        {rows}
      </Group>
    </Layer>
  );
}

export default ForestTrees