<template>
  <div class="narrow-container">
    <h1>Store Policy</h1>
    <div class="outer-grid-container">
      <div>
        <h5>Customer Care</h5>
        <div class="inner-grid-container">
          <p>I’m a Customer Care section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>

          <p>I’m a Customer Care section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>
        </div>
      </div>

      <div>
        <h5>Privacy & Safety</h5>
        <div class="inner-grid-container">
          <p>I’m a Privacy & Safety section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>

          <p>I’m a Privacy & Safety section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>
        </div>
      </div>

      <div>
        <h5>Wholesale Inquiries</h5>
        <div class="inner-grid-container">
          <p>I’m a Wholesale Inquiries section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>

          <p>I’m a Wholesale Inquiries section. I’m a great place to update 
          your customers about your shipping methods, packaging and costs.
          Use plain, straightforward language to build trust and make 
          sure that your customers stay loyal!</p>
        </div>
      </div>

      <div>
        <h5>Payment Methods</h5>
        <div class="inner-grid-container">
          <span>- Credit / Debit Cards</span>
          <span>- PAYPAL</span>
          <span>- Offline Payments</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Store Policy'
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
.outer-grid-container{
  display: grid;
  grid-template-rows: repeat(4, auto);
  row-gap: 20px;
  margin-bottom: 50px;
}
.inner-grid-container{
  display: grid;
  grid-template-rows: repeat(2, auto);
  width: 60%;
}
.inner-grid-container p, .inner-grid-container span{
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