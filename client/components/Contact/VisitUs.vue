<template>
  <div>
    <h1>Visit Us</h1>
    <div class="grid-container">
      <div>
        <h4>Flagship Store</h4> 
        <p>Tel: 123-456-7890 <br>
        500 Terry Francois Street <br>
        San Francisco, CA 94158</p>
      </div>
      <div>
        <h4>Store 02</h4> 
        <p>Tel: 123-456-7890 <br>
        500 Terry Francois Street <br>
        San Francisco, CA 94158</p>
      </div>
      <div>
        <h4>Store 03</h4> 
        <p>Tel: 123-456-7890 <br>
        500 Terry Francois Street <br>
        San Francisco, CA 94158</p>
      </div>
      <div>
        <h5>Opening Hours</h5> 
        <p>Mon - Fri: 7am - 10pm <br>
        Saturday: 8am - 10pm <br>
        Sunday: 8am - 11pm</p>
      </div>
      <div>
        <h5>Opening Hours</h5> 
        <p>Mon - Fri: 7am - 10pm <br>
        Saturday: 8am - 10pm <br>
        Sunday: 8am - 11pm</p>
      </div>
      <div>
        <h5>Opening Hours</h5> 
        <p>Mon - Fri: 7am - 10pm <br>
        Saturday: 8am - 10pm <br>
        Sunday: 8am - 11pm</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1{
  color: var(--primary-color);
  margin: 40px 0;
}
.grid-container{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 100px;
  row-gap: 30px;
  margin-bottom: 30px;
}
.grid-container h4, .grid-container h5{
  margin-bottom: 10px;
}
.grid-container h4{
  color: var(--secondary-color);
}
.grid-container p{
  font-size: 0.8rem;
}
@media only screen and (max-width: 700px){
  .grid-container{
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
  .grid-container h4{
    font-size: 1.5rem;
  }
  .grid-container h5{
    font-size: 1.2rem;
  }
  .grid-container p{
    font-size: 1rem;
  }
}
</style>