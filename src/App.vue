<template>
	<div id="visual">
		Controllable container
		<Drawer/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EventBus from "./utils/event-bus";
import Drawer from "./components/Drawer.vue";

@Component({
	components: {
		Drawer
	}
})
export default class App extends Vue {
	
}
</script>
<style scoped lang="scss">
	
	#visual {

		width: 100%;
		height: 100vh;
	}

</style>