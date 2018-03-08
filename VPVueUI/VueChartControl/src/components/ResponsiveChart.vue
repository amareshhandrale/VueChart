<template id="boxes-template">
	<div >
		<boxes-checks :width="300" :height="200"></boxes-checks>
		<!--<CommitChart  :width="600" :height="400"></CommitChart>-->
	</div>
   
</template>



<script>
	import BoxesChecks from '@/vpmodule/responsivedata'

	export default {
	name: 'app',
	components: {
	BoxesChecks
	},
	async created () {
	this.mydata =  BoxesChecks
	}
}


</script>