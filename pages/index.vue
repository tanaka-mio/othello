<template>
  <div class="board">
    <template v-for="y in board.length">
      <div v-for="x in board[y - 1].length" :key="`${x}-${y}`" class="cell" @click="onClickCell(x - 1, y - 1)">
        <div
          v-if="board[y - 1][x - 1] !== 0"
          :class="['ball', board[y - 1][x - 1] === 1 ? 'white' : 'black']"
        />
      </div>
    </template>
    <button />
  </div>
</template>

<script>
export default {
  data () {
    // 値を返却（HTMLに渡す）
    return {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      turn: -1
    }
  },
  methods: {
    onClickCell (x, y) {
      let result = false
      // すでに石が置かれているかチェックする
      if (this.board[y][x] !== 0) {
        return
      }
      // 石が周りにあるか確認する
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          // 周りのマスに石が1つでもあればtrue
          if (this.board[i] && this.board[i][k] && this.board[i][k] !== 0) {
            console.log(i, k)
            result = true
            break
          }
        }
      }
      if (result) {
        this.board = JSON.parse(JSON.stringify(this.board))
        // 黒か白の判定
        this.board[y][x] = this.turn
        // turnを判定させる
        this.turn *= -1
      }
    }
  }
}
</script>

<style>
.board {
  margin: 0 auto;
  width:640px;
  height: 640px;
  background: #060;
}

.cell {
  width: 12.5%;
  height: 12.5%;
  border: black solid 1px;
  float:left;
  list-style: none;
}

.ball {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  margin: 10%;
}

.black {
  background: black;
}

.white {
  background: white;
}
</style>
