<template>
  <div>
    <div class="promo-code">
      <p @click="isPromoCodeClicked = !isPromoCodeClicked">
        <v-icon class="icon">mdi-tag-outline</v-icon>
        Enter a promo code
      </p>
      <div v-if="isPromoCodeClicked">
        <input type="text" name="promoCode" placeholder="Enter a promo code" v-model="code">
        <button type="button" name="apply" @click.prevent="applyCode">
          Apply
        </button>
      </div>
    </div>
    <div class="add-note">
      <p @click="isNoteClicked = !isNoteClicked">
        <v-icon>mdi-note-text-outline</v-icon>
        Add a note
      </p>
      <div v-if="isNoteClicked">
        <textarea name="note" cols="29" rows="3" v-model="note"
        placeholder="Instructions? Special requests? Add them here.">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isPromoCodeClicked: false,
      isNoteClicked: false,
      code: '',
      note: ''
    }
  },
  methods: {
   applyCode(){
     this.$emit('applyCode', this.code)
   } 
  }
}
</script>

<style lang="scss" scoped>
.promo-code, .add-note{
  color: var(--primary-color);
  font-size: 0.8rem;
}
.promo-code p, .add-note p{
  margin-bottom: 5px;
}
p:hover{
  cursor: pointer;
}
.add-note{
  margin-top: 20px;
  margin-bottom: 50px;
}
input[type=text], textarea{
  border: 1px solid grey;
  padding: 3px 5px;
  outline: none;
}
button{
  border: 1px solid var(--primary-color);
  padding: 3px 10px;
  position: absolute;
  outline: none;
}
.v-icon{
  color: var(--primary-color);
  font-size: 12px;
  margin-right: 5px;
}
.icon{
  transform: rotate(90deg) scaleX(1);
}
textarea{
  resize: none;
}
</style>