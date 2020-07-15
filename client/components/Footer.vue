<template>
<v-footer padless>
  <div class="wide-container">
    <div class="grid-container">

      <div class="store">
        <h4>Our Flagship Store</h4> 
        <p class="text-caption">
          500 Terry Francois Street <br>
          San Francisco, CA 94158 <br>
          Tel: 123-456-7890
        </p>
        <nuxt-link to="/contact" class="text-caption">
          Views stores list
        </nuxt-link>
      </div>

      <div>
        <h4>Shop</h4>
        <div v-for="item in shop" :key="item.title">
          <nuxt-link :to="item.linkTo" class="text-caption">
            {{ item.title }}
          </nuxt-link>
        </div>
      </div>
    
      <div>
        <h4>Info</h4> 
        <div v-for="item in info" :key="item.title">
          <nuxt-link :to="item.linkTo" class="text-caption">
            {{ item.title }}
          </nuxt-link>
        </div>
      </div>

      <div>
        <form @submit.prevent="submitSubscribe()">
          <label for="email">
            <h4>Get Special Deals & Offers</h4>
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            v-model="email"
            placeholder="Email Address*"
            class="text-caption pa-1"  
          >
          <button 
            type="submit"
            id="subscribe-btn" 
            name="subscribe-btn" 
          >
            Subscribe
          </button>
          <div v-if="message != ''" class="subscribe-message">
            {{ message }}
          </div>
        </form>
        <div class="social-section">
          <h4 class="mt-5">Become Our Bestie!</h4>
          <div class="social-icons">
            <v-icon small>mdi-facebook</v-icon>
            <v-icon small>mdi-youtube</v-icon>
            <v-icon small>mdi-instagram</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright">
      &copy;{{ year }} by Besties. Proudly created with Wix.com
  </div>
</v-footer>
</template>

<script>
export default {
  data() {
    return {
      shop: [
        {
          title: 'Dogs',
          linkTo: '/products/animals/dog'
        },
        {
          title: 'Cats',
          linkTo: '/products/animals/cat'
        },
        {
          title: 'Birds',
          linkTo: '/products/animals/bird'
        },
        {
          title: 'Fish & Aquatics',
          linkTo: '/products/animals/fish'
        },
        {
          title: 'Small animals',
          linkTo: '/products/animals/small_animal'
        },
        {
          title: 'Reptiles',
          linkTo: '/products/animals/reptile'
        }
      ],
      info: [
        {
          title: 'Our Story',
          linkTo: '/our-story'
        },
        {
          title: 'Contact',
          linkTo: '/contact'
        },
        {
          title: 'Shipping & Returns',
          linkTo: '/shipping-and-return'
        },
        {
          title: 'Store Policy',
          linkTo: '/store-policy'
        },
        {
          title: 'FAQ',
          linkTo: '/faq'
        },
      ],
      email: '',
      message: ''
    }
  },
  computed: {
    year() {
      const year = new Date()
      return year.getFullYear()
    }
  },
  methods: {
    async submitSubscribe(){
      const response = await this.$axios.$post('/subscribe', { email: this.email } )
      this.message = response.message
    }
  }
}
</script>

<style lang="scss" scoped>
.v-footer{
  margin-top: auto;
  background-color: white;
}
.wide-container{
  width: 90%;
  background-color: var(--primary-color);
  color: white;
}
.grid-container{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 100px;
}
h4{
  margin: 20px 0;
}
.store a{
  text-decoration: underline;
}
a{
  color: white !important;
}
#email{
  width: 90%;
  opacity: 70%;
  background-color: white;
}
#subscribe-btn{
  width: 90%;
  background-color: #FFB300;
  text-align: center;
  color: white;
  margin-top: 5px;
  padding: 3px 0;
  font-size: 0.7rem;
}
#subscribe-btn:focus, #email:focus{
  outline: none;
}
.copyright{
  font-size: 0.6rem;
  margin: 12px auto;
}
.social-icons .v-icon{
  color: white;
  margin: 0 3px;
}
.social-section h4{
  margin: 5px 0;
}
.subscribe-message{
  font-size: 0.6rem;
  padding-top: 2px;
}
@media only screen and (max-width: 700px){
  .wide-container{
    width: 100%;
  }
  .grid-container{
    grid-template-columns: 1fr;
    row-gap: 20px;
    padding: 30px 50px;
  }
  h4{
    margin: 5px 0;
  }
  .social-section{
    text-align: center;
  }
}
</style>