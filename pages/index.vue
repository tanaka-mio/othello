<template>
  <div class="board">
    <ul v-for="item of items" v-bind:key="item.num" class="cell">
      <li v-if="item.value === '1'" class="whiteball" />
      <li v-else-if="item.value === '-1'" class="blackball" />
      <li v-else />
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    const tempitems = []
    for (let i = 0; i < 64; i++) {
      if (i === 27 || i === 36) {
        tempitems.push({ num: i, value: '1' })
      } else if (i === 28 || i === 35) {
        tempitems.push({ num: i, value: '-1' })
      } else {
        tempitems.push({ num: i, value: '0' })
      }
    }
    return {
      items: tempitems,
      turn: false
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
