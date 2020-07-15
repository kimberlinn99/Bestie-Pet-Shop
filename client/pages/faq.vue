<template>
  <div class="narrow-container">
    <h1>FAQ</h1>
    <div class="faq-header">
      <v-icon 
        class="magnify-icon"
        :ripple="false"
        @click="isClicked = !isClicked"
      >
        mdi-magnify
      </v-icon>
      <span :class="{ 'faq-header--disappear': isClicked }">
        <h1 class="text-center">Frequently Asked Questions</h1>
      </span>
      <v-text-field 
        v-if="isClicked"
        single-line
        clearable
        dense
        placeholder="Looking for something?"  
        class="text-field-placeholder"
        v-model="search"
      >
      </v-text-field>
    </div>

    <v-expansion-panels flat class="expansion-panels">
      <v-expansion-panel
        v-for="faq in filterFAQ"
        :key="faq.question"
      >
        <v-expansion-panel-header expand-icon="mdi-chevron-down" class="pa-0 question-panel">
          {{ faq.question }} 
        </v-expansion-panel-header>
        <v-expansion-panel-content class="panel-content">
          {{ faq.answer }}
          <div v-if="faq.subAnswer != ''">
            <ol>
              <li v-for="(ans, index) in faq.subAnswer" :key="ans" class="pa-0">
                {{ index + 1 }}. {{ ans }}
              </li>
            </ol>
          </div>
        </v-expansion-panel-content>
        <v-divider></v-divider>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isClicked: false,
      search: '',
      faqList: [
        {
          question: 'How do I add a new question?',
          answer: 'To add a new question go to app settings and press "Manage Questions" button.',
          subAnswer: []
        },
        {
          question: 'Can I insert pictures in my FAQ?',
          answer: 'Yes! To add a picture follow these simple steps:',
          subAnswer: [
            'Enter App Settings',
            'Click the "Manage Questions" button',
            'Click on the question you would like to attach a picture to',
            'When editing your answer, click on the picture icon and then add an image from your library'
          ]
        },
        {
          question: 'Can I insert a video in my FAQ?',
          answer: 'Yes! Users can add video from YouTube or Vimeo with ease:',
          subAnswer:[
            'Enter App Settings',
            'Click the "Manage Questions" button',
            'Click on the question you would like to attach a video to',
            'When editing your answer, click on the video icon and then paste the YouTube or Vimeo video URL',
            "That's it! A thumbnail of your video will appear in answer text box"
          ]
        },
        {
          question: 'How do I edit or remove the "FAQ title"?',
          answer: `The FAQ title can be adjusted in the settings tab of the App Settings. 
                 You can also remove the title by unchecking its checkbox in the settings tab.`,
          subAnswer: [] 
        }
      ]
    }
  },
  computed: {
    filterFAQ(){
      var list = this.faqList
      if(this.search == '' || this.search == null){
        return list
      } else{
        const word = this.search.toLowerCase()
        list = list.filter(item => {
          var question = item.question.toLowerCase()
          var answer = item.answer.toLowerCase()

          if(item.subAnswer.length != 0){
            var foundInSubAnswer = false
            // Loop within sub answers to find the keyword
            item.subAnswer.forEach(ans => {
              if(ans.toLowerCase().indexOf(word) != -1){
                foundInSubAnswer = true
              }
            });
            return question.indexOf(word) != -1 ||
                   answer.indexOf(word) != -1 ||
                   foundInSubAnswer
          } else{
            return question.indexOf(word) != -1 ||
                   answer.indexOf(word) != -1
          }
        })
        return list
      }
    }
  },
  head: {
    title: 'FAQ'
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: var(--primary-color);
  margin: 40px 0;
}
.expansion-panels{
  margin-bottom: 50px;
}
.faq-header{
  height: 80px;
}
.faq-header--disappear{
  display: none;
}
.magnify-icon{
  float: right;
  color: var(--secondary-color);
  margin-top: 12px;
}
.question-panel{
  font-weight: 600;
  color: var(--secondary-color);
}
::v-deep{
  .v-expansion-panel-content__wrap{
    padding: 0;
    padding-bottom: 10px;
  }
  .v-expansion-panel--active:not(:first-child),
  .v-expansion-panel--active + .v-expansion-panel{
    margin: 0;
  }
  .v-text-field__slot input, .v-input__icon button{
    color: var(--secondary-color) !important;
  }
  .v-input__icon button{
    font-size: 15px;
    padding: 2px;
  }
  .v-input__slot:before{
    border-color: var(--secondary-color) !important;
  }
  .v-input__slot:after{
    border: none  !important;
  }
}
.text-field-placeholder{
  font-size: 0.8rem;
  padding-right: 20px;
}
.text-field-placeholder ::placeholder{
  color: var(--secondary-color) !important;
  opacity: 1;
}
ol{
  padding-left: 10px 
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
  .faq-header{
    height: 70px;
  }
  .faq-header h1{
    padding-top: 5px;
    font-size: 1.5rem;
  }
}
</style>