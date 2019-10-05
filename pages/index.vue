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
      // 取れる可能性のある石
      possibilityStone: [],
      // 取れる石
      getstone: []
    }
  },
  methods: {
    onClickCell (x, y) {
      /*
       * 方向の先にある石が何色かチェックする関数
       * 引数：ボードの配列、対象の石座標（X,Y）、方向の座標（X,Y）、自分の色
       * 自分と同じ色がある場合、リストとして返却
       * 石が何も置かれていない場合、空のリストを返却
       * 敵の色がある→再帰関数を呼び続ける
       * 問題①間の石の候補を取れていないので複数続いた場合、1個しか石が取れない
       * 問題②方向の先に石が何も置かれていない場合、undefinedのリストが追加される
       */
      function checkCell (board, centerI, centerK, directionY, directionX, color) {
        // 対象の石座標に方向の座標を足しこんでチェック対象を取得する
        const targetY = centerI + directionY
        const targetX = centerK + directionX
        const target = board[targetY][targetX]
        // 終了になる条件：自分と同じ色（リスト追加）
        if (target === color) {
          return ([centerI, centerK])
        // 再帰になる条件：ライバルと同じ色
        } else if (target === (color * -1)) {
          const paramDirectionY = targetY - centerI
          const paramDirectionX = targetX - centerK
          // 再帰関数を呼ぶ
          return checkCell(board, targetY, targetX, paramDirectionY, paramDirectionX, color)
        }
      }
      // (1) 更新を実施するか判定用変数
      let result = false
      // (2) すでに石が置かれているかチェックする
      if (this.board[y][x] !== 0) {
        return
      }
      // (3) 周り１マスをチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          // 周りのマスに石が1つでもあればtrueとする
          if (this.board[i] && this.board[i][k] && this.board[i][k] !== 0) {
            result = true
            break
          }
        }
      }
      // (4) 取れる石があるかチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          // 敵のマスだった場合、チェック関数を呼び出す
          if (this.board[i] && this.board[i][k] &&
              this.board[i][k] === (this.turn * -1)) {
            // 方向を算出する（対象ー置こうとした場所）
            const directionY = i - y
            const directionX = k - x
            // 方向の先にある石が何色かチェックする関数
            // 自分と同じ色がある場合、リストとして返却
            // 石が何も置かれていない場合、空のリストを返却
            // 敵の色がある→再帰関数を呼び続ける
            this.getstone.push(checkCell(this.board, i, k, directionY, directionX, this.turn))
          }
        }
      }
      // 取ってきたリストが０件の場合更新しない
      if (this.getstone.length === 0) {
        result = false
      }
      // (5) 石の更新処理
      if (result) {
        this.board = JSON.parse(JSON.stringify(this.board))
        // クリックした場所を更新する
        this.board[y][x] = this.turn
        // 取れた範囲を更新する
        for (let listsize = 0; listsize < this.getstone.length; listsize++) {
          if (this.getstone[listsize]) {
            const updateX = this.getstone[listsize][0]
            const updateY = this.getstone[listsize][1]
            this.board[updateX][updateY] = this.turn
          }
        }
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
