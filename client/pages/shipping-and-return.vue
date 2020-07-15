<template>
  <div class="narrow-container">
    <h1>Shipping and Return</h1>
    <div class="outer-grid-container">
      <div>
        <h5>Shipping Policy</h5>
        <div class="inner-grid-container">
          <p>I’m a shipping policy section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>

          <p>I’m a shipping policy section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>
        </div>
      </div>
      <div>
        <h5>Return & Exchange Policy</h5>
        <div class="inner-grid-container">
          <p>I’m a Return & Exchange Policy section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>

          <p>I’m a Return & Exchange Policy section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Shipping and Return'
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: var(--primary-color);
  margin: 40px 0;
}
h5{
  color: var(--secondary-color);
  margin-bottom: 15px;
}
.outer-grid-container, .inner-grid-container{
  display: grid;
  grid-template-rows: repeat(2, auto);
}
.outer-grid-container{
  row-gap: 20px;
  margin-bottom: 50px;
}
.inner-grid-container{
  width: 60%;
}
.inner-grid-container p{
  font-size: 0.8rem;
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
  .inner-grid-container{
    width: 100%;
  }
}
</style>