<template >
 <v-card >
 <v-card-title><h4>Pain Assessment</h4></v-card-title>
  <v-divider v-if="true"></v-divider>
    <line-chart></line-chart>
   <v-list dense v-if="getPainRowsCount <= 0">
      No assessment found in the current admission
   </v-list>
    
 </v-card>
</template>
<style scoped>
li
{
  height:30px !important;
}
ul.list{
  
  padding-top:0px !important;
  padding-bottom:15px !important;
  margin:0px !important;
}
.card__title
{
  height:20px !important;
  padding-top:10px !important;
  padding-bottom:0px !important;
  margin:0px !important;
}
.divider {
  border-top:1px solid #eee !important;
}
div.list__tile__content
{
  width:40% !important;
}
</style>
<script>
    import {mapState,mapActions,mapGetters, mapMutations} from 'vuex'
	import painService from '../../store/modules/Pain'
    import SessionOrAuthToken from '../Authentication/SessionOrToken'
    
	export default {
	name: 'PainAssessmentWidget',
    mixins:[SessionOrAuthToken],
	props:['patno'],
	components: {
	  'line-chart': painService
	},
  computed : {
	...mapGetters('pain',[
	'getPainRowsCount',
	]),
	...mapState({
	painState : state => state.pain
	})
	},
    created() {
	  this.$store.dispatch('pain/getPainAssessment',this.patno);
	}
}


</script>
