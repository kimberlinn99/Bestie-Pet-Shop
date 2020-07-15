<template>
<div>

  <form>
    <input type="text" name="name" placeholder="Name" v-model="name">
    <input type="email" name="email" placeholder="Email" required v-model="email">
    <input type="tel" name="phone" v-model="phone"
      placeholder="Phone ex. 123-456-789"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
    <textarea name="message" cols="30" rows="3" 
      v-model="message" placeholder="Message">
    </textarea>
    <v-btn text tile depressed
      @click="submitForm"
      class="text-caption white--text text-capitalize submit-btn">
      Send
    </v-btn>
    <div class="message-after-submit">
      <p v-if="messageAfterSubmit != ''">
        {{ messageAfterSubmit }}
      </p>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      messageAfterSubmit: ''
    }
  },
  head: {
    title: 'Contact'
  },
  methods: {
    async submitForm(){
      const response = await this.$axios.$post('/feedback', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message
      })
      this.messageAfterSubmit = response.message
    }
  },
}
</script>

<style lang="scss" scoped>
input, textarea{
  width: 100%;
  padding: 2px 10px;
  font-size: 0.8rem;
  border: 1px solid black;
  margin: 4px;
}
input, textarea{
  outline: none;
}
textarea{
  resize: none;
}
.submit-btn{
  background-color: var(--secondary-color);
  width: 100px;
  height: 25px !important;
  float: right;
}
.message-after-submit{
  font-size: 0.6rem;
  float: right;
}
.message-after-submit p{
  position: absolute;
  margin-top: 27px;
}
</style>