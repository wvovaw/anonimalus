<template>
 <div class="faq">
    <h3>F.A.Q</h3>
    <div
      class="faq-entry"
      v-for="edge in $static.questions.edges" :key="edge.node.id"
    >
      <button class="question"><b> {{ edge.node.question }} </b></button>
      <div class="answer">
        <p> {{ edge.node.answer }} </p>
      </div>
    </div>
 </div>
</template>

<static-query>
query {
  questions: allQuestion {
    edges {
      node {
        id
        question
        answer
      }
    }
  }
}
</static-query>

<script>
export default {
  mounted: () => {
    let acc = document.getElementsByClassName("question");

    acc.forEach((i) => {
      i.addEventListener('click', () => {
        let answer = i.nextElementSibling;
        i.classList.toggle('active');
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      })
    })
  }
}
</script>

<style scoped>
p {
  padding-left: 20px;
}
.faq-entry {
  margin-bottom: 30px;
}
.question {
  background-color: rgb(50, 50, 50);
  color: black;
  font-size: 0.8em;
  padding: 15px 0 15px 20px;

  border: none;
  border-left: 1px solid rgb(50, 50, 50);
  border-right: 1px solid rgb(50, 50, 50);
  border-top: 1px solid  rgb(50, 50, 50);

  cursor: pointer;
  width: 100%;
  text-align: left;
  outline: none;
  transition: 0.2s;
}
.answer {
  font-size: 0.8em;
  border-left: 1px solid rgb(50, 50, 50);
  border-right: 1px solid rgb(50, 50, 50);
  border-bottom: 1px solid  rgb(50, 50, 50);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.question:hover {
  background-color: rgba(255, 255, 255, 0.116);
}
.question:after {
  content: '\02795'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  float: right;
  margin-right: 20px;
}

.active:after {
  content: "\2796"; /* Unicode character for "minus" sign (-) */
}
</style>
