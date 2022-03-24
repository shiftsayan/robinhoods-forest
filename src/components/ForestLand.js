import { Layer, Path, Group } from 'react-konva';
import { range } from "../util";

const TILE_WIDTH = 62
const TILE_HEIGHT = 62

function ForestLandTilePath(props) {
  return (
    <Path
      data="M64 16L32 0L0 16L32 32L64 16Z"
      x={props.x}
      y={props.y}
      fillRadialGradientStartPointX={TILE_WIDTH/2}
      fillRadialGradientStartPointY={TILE_HEIGHT/4 + 2}
      fillRadialGradientEndPointX={TILE_WIDTH/2}
      fillRadialGradientEndPointY={TILE_HEIGHT/4 - 2}
      fillRadialGradientStartRadius={0}
      fillRadialGradientEndRadius={TILE_WIDTH/4}
      fillRadialGradientColorStops={[0, '#B2DA53', 0.4, '#A7D349', 1, '#9BCB3D']}
    />
  )
}

function ForestLandTile(props) {
  return (
    <>
      <ForestLandTilePath
        x={props.x}
        y={props.y}
      />
      <Path
        data="M64 48V16L32 32V64L64 48Z"
        fill="#80642E"
        x={props.x}
        y={props.y}
      />
      <Path
        data="M0 48V16L32 32V64L0 48Z"
        fill="#594620"
        x={props.x}
        y={props.y}
      />
    </>
  )
}

function ForestLand(props) {
  var row_numbers = range(props.dimension*2 - 1)
  var rows = row_numbers.map(
    function(row_number) {
      var total_columns = Math.min(row_number + 1, props.dimension*2 - row_number - 1)
      var row_starting_x = window.innerWidth/2 - TILE_WIDTH * total_columns/2
      var col_numbers = range(total_columns)
      var cols = col_numbers.map(
        function(col_number) {
          return (
            <ForestLandTile x={row_starting_x + TILE_WIDTH * col_number} y={TILE_HEIGHT/2 + TILE_HEIGHT/4 * row_number} />
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

export default ForestLand