export const state = () => ({
  message: '',
  board: [],
  // hashCode: localStorage.hashCode || '',
  hashCode: '',
  turn: 0,
  status: ''
})
export const mutations = {
  setMessage (state, message) {
    // 取得したメッセージを格納
    this.state.message = message
  },
  setBoard (state, board) {
    // 取得したオセロ配列を格納
    this.state.board = board
  },
  setHashcode (state, hashCode) {
    // 取得したハッシュコードを格納
    this.state.hashCode = hashCode
    // localStorage.hashCode = hashCode
  },
  setTurn (state, turn) {
    // 取得した自分のターンを格納
    this.state.turn = turn
  },
  setStatus (state, status) {
    // 取得したステータスを格納
    this.state.status = status
  }
}
export const actions = {
  async getMessage ({ commit }) {
    // メッセージ取得処理
    const response = await this.$axios.$get('getMessage')
    commit('setMessage', response)
  },
  async getBoard ({ commit }) {
    // オセロ配列取得処理
    const response = await this.$axios.$get('getOthelloStone')
    commit('setBoard', response)
  },
  async hitOthello ({ commit }, { hitX, hitY, hashCode }) {
    // オセロ押下処理
    const response = await this.$axios.$get('hitOthelloStone',
      { params: { hitX, hitY, hashCode } })
    commit('setMessage', response)
  },
  async getHashTurn ({ commit }) {
    // オセロ配列取得処理
    const response = await this.$axios.$get('getGameStartCode')
    commit('setHashcode', response.hashCode)
    commit('setTurn', response.turn)
  },
  async getBoardStatus ({ commit }, hashCode) {
    if (!hashCode) {
      hashCode = 'null'
    }
    // TODO:ローカルストレージ使うときにコメントはずす
    // state.hashCode
    // オセロ配列取得処理
    const response = await this.$axios.$get('getBoardStatus', { params: { hashCode } })
    commit('setBoard', response.OthelloStone)
    commit('setStatus', response.status)
    commit('setMessage', response.message)
  },
  getStopCode ({ commit }) {
    // 停止処理：本当はAPIから停止ステータス欲しいけどそこまで実装していないので一旦
    commit('setStatus', 'stopping')
  }
}
