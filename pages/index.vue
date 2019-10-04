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
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      turn: -1,
      getstone: []
    }
  },
  methods: {
    onClickCell (x, y) {
      // 更新を実施するか判定用変数
      let result = false
      // すでに石が置かれているかチェックする
      if (this.board[y][x] !== 0) {
        return
      }
      // 周り１マスをチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          // 周りのマスに石が1つでもあればtrueとする
          if (this.board[i] && this.board[i][k] && this.board[i][k] !== 0) {
            result = true
            break
          }
        }
      }
      // 敵のあれ
      const ribal = this.turn * -1
      // 再帰関数作成
      function checkCell (center, direction, color) {
        // チェックする
        // TODO:centerに方向を足しこんでtargetとする
        // TODO:targetの色をチェックする
        // 終了になる条件（リスト追加）
        if (center !== 0) {
        // 終了になる条件（処理終了じゃ）
        } else if (center === 0) {
        // 再帰になる条件
        } else {
        }
      }
      // 周り１マスをチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          console.log(x, y, i, k, this.board[i], this.board[i][k], ribal)
          // 敵のマスだった場合、配列に格納していく
          if (this.board[i] && this.board[i][k] &&
              this.board[i][k] === ribal) {
            checkCell(3, 3, 3)
            // TODO:centerは[i, k]とする
            // TODO:directionどうやって出そう
            // リスト追加はこれでいけるthis.getstone.push([i, k])
            // DEBUG用console.log(this.getstone)
          }
        }
      }
      // 石の更新処理
      if (result) {
        this.board = JSON.parse(JSON.stringify(this.board))
        // クリックした場所を更新する
        this.board[y][x] = this.turn
        // TODO:取れた範囲を更新する
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
