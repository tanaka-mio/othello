export const state = () => ({
  message: '',
  board: []
})
export const mutations = {
  getMessage (state, message) {
    // 取得したメッセージを格納
    this.state.message = message
  },
  getBoard (state, board) {
    // 取得したオセロ配列を格納
    this.state.board = board
  }
}
export const actions = {
  async getMessage ({ commit }) {
    // メッセージ取得処理
    const response = await this.$axios.$get('http://localhost:8080/api/sample/getMessage')
    commit('getMessage', response)
  },
  async getBoard ({ commit }) {
    // オセロ配列取得処理
    const response = await this.$axios.$get('http://localhost:8080/api/sample/getOthelloStone')
    commit('getBoard', response)
  },
  async hitOthello ({ commit }, { argX, argY }) {
    // オセロ押下処理
    const response = await this.$axios.$get('http://localhost:8080/api/sample/hitOthelloStone',
      {
        params: {
          hitX: argX,
          hitY: argY
        }
      })
    commit('getMessage', response)
  }
}
