import Tracking from "./tracking";

export default {

	install(Vue) {

		Vue.prototype.$tracking = new Tracking();
	}
};