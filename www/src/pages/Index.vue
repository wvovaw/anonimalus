<template>
  <Layout>
    <Description />
    <hr>
    <Commands />
    <hr>
    <Faq />
    <hr>
    <Contact />
  </Layout>
</template>

<script>
import Description from '../components/IndexPage/Description';
import Commands from '../components/IndexPage/CommandsTable';
import Faq from '../components/IndexPage/Faq';
import Contact from '../components/IndexPage/Contact';

export default {
  metaInfo: {
    title: 'Anonimalus: A discord bot for anonymous communication'
  },
  components: { Description, Commands, Faq, Contact }
}
</script>
