<template>
  <div class="board">
    <template v-for="y in board.length">
      <div v-for="x in board[y - 1].length" :key="`${x}-${y}`" class="cell" @click="onClickCell(x - 1, y - 1, hashCode)">
        <div
          v-if="board[y - 1][x - 1] !== 0"
          :class="['ball', board[y - 1][x - 1] === 1 ? 'white' : 'black']"
        />
      </div>
    </template>
    <div>
      <button @click="getHashTurn()">GAME START!!!</button>
      <br />
      {{ message }}
      <br />
      <button @click="getStopCode()">STOP!!!</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      stopCode: 0
    }
  },
  computed: {
    ...mapState(['message', 'board', 'hashCode', 'status'])
  },
  watch: {
    status (val) {
      if (val === 'stopping') {
        this.stopCode = 1
      }
    }
  },
  async fetch ({ store }) {
    await store.dispatch('getBoard')
  },
  methods: {
    async getMessage () {
      await this.$store.dispatch('getMessage')
    },
    async onClickCell (hitX, hitY, hashCode) {
      await this.$store.dispatch('hitOthello', { hitX, hitY, hashCode })
      await this.$store.dispatch('getBoardStatus')
    },
    async getHashTurn () {
      await this.$store.dispatch('getHashTurn')
      const intervalId = setInterval(() => {
        this.getBoardStatus()
        if (this.stopCode === 1) {
          clearInterval(intervalId)
        }
      }, 1000)
    },
    async getBoardStatus () {
      await this.$store.dispatch('getBoardStatus')
    },
    async getBoard () {
      await this.$store.dispatch('getBoard')
    },
    getStopCode () {
      this.$store.dispatch('getStopCode')
    }
    /*
    ,
    onClickCell (x, y) {
      // 更新を実施するか判定する変数
      let result = false
      // すでに石が置かれているかチェックする
      if (this.board[y][x] !== 0) {
        return
      }
      // 周りのマスに石が1つでもあるかチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          if (this.board[i] && this.board[i][k] && this.board[i][k] !== 0) {
            result = true
            break
          }
        }
      }
      // 取れる石があるかチェックする
      for (let i = y - 1; i < y + 2; i++) {
        for (let k = x - 1; k < x + 2; k++) {
          // 敵のマスだった場合、チェック関数を呼び出す
          if (this.board[i] && this.board[i][k] &&
              this.board[i][k] === (this.turn * -1)) {
            // 方向を算出する（対象ー置こうとした場所）
            const directionY = i - y
            const directionX = k - x
            // 方向の先にある石が何色かチェックする関数
            // 自分と同じ色がある場合、possiblestoneをgetstoneにリスト追加
            // 石が何も置かれていない場合、その方向のチェックは処理終了
            // 敵の色がある→候補リストpossiblestoneにリスト追加し、再帰関数を呼び続ける
            this.checkCell(i, k, directionY, directionX)
          }
        }
      }
      // 取ってきたリストが０件の場合更新しない
      if (this.getstone.length === 0) {
        result = false
      }
      // 石の更新処理
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
        // getstoneの初期化
        this.getstone.length = 0
      }
    },
    /*
       * 方向の先にある石が何色かチェックする関数
       * 引数：対象の石座標（X,Y）、方向の座標（X,Y）
       * 自分と同じ色がある場合、リストとして返却
       * 石が何も置かれていない場合、空のリストを返却
       * 敵の色がある→再帰関数を呼び続ける
    checkCell (centerI, centerK, directionY, directionX) {
      const board = this.board
      // 対象の石座標に方向の座標を足しこんでチェック対象を取得する
      const targetY = centerI + directionY
      const targetX = centerK + directionX
      const target = board[targetY][targetX]
      // 終了になる条件：自分と同じ色（リスト追加）
      if (target === this.turn) {
        // 自分を追加する
        this.getstone.push([centerI, centerK])
        // 今までの候補リストを追加する
        if (this.possiblestone.length !== 0) {
          for (let m = 0; m < this.possiblestone.length; m++) {
            const insertY = this.possiblestone[m][0]
            const insertX = this.possiblestone[m][1]
            this.getstone.push([insertY, insertX])
          }
        }
        // 候補リストの初期化
        this.possiblestone.length = 0
      // 再帰になる条件：ライバルと同じ色
      } else if (target === (this.turn * -1)) {
        const paramDirectionY = targetY - centerI
        const paramDirectionX = targetX - centerK
        // 候補可能性がある石リストに追加する
        this.possiblestone.push([centerI, centerK])
        // 再帰関数を呼ぶ
        this.checkCell(targetY, targetX, paramDirectionY, paramDirectionX)
      // 処理を終了させる条件：先に何もない
      } else if (target === 0) {
        // 候補リストの初期化
        this.possiblestone.length = 0
      }
    }
    */
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
