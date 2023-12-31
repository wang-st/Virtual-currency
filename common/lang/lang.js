import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import jp from './jp'
import hk from './hk'
import ar from './ar'
import hg from './hg'
import yd from './yd'
let locale=uni.getStorageSync('lang') || '';
if(locale==''){
	locale='en';
	uni.setStorageSync('lang',locale)
}
const i18n=new VueI18n({
	locale:locale,
	messages:{
		zh: zh,
		en: en,
		jp:jp,
		hk:hk,
		ar:ar,
		hg:hg,
		yd:yd
	}
})
export default i18n