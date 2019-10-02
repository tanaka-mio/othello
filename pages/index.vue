<template>
  <div class="board">
    <ul v-for="item of items" v-bind:key="item.num" class="cell">
      <li v-if="item.value === '1'" class="whiteball" />
      <li v-else-if="item.value === '-1'" class="blackball" />
      <li v-else />
    </ul>
    <button />
  </div>
</template>

<script>
export default {
  data () {
    // ボード形成用配列
    const tempitems = []
    // 配列に値を格納 ※デフォルト石をべたで書いてしまっているのを何とかする
    for (let i = 0; i < 64; i++) {
      if (i === 27 || i === 36) {
        tempitems.push({ num: i, value: '1' })
      } else if (i === 28 || i === 35) {
        tempitems.push({ num: i, value: '-1' })
      } else {
        tempitems.push({ num: i, value: '0' })
      }
    }
    // 値を返却（HTMLに渡す）
    return {
      items: tempitems,
      turn: false
    }
  },
  methods: {
    onClickCell () {
      alert('kita')
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
.cell{
  width: 12.5%;
  height: 12.5%;
  border: black solid 1px;
  float:left;
  list-style: none;
  padding:0.5%;
}
.blackball{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: black solid 1px;
  background: black;
}
.whiteball{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: black solid 1px;
  background: white;
}

</style>
