<script>
	import {domain} from '@/common/domain.js'
	import { mapState } from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS  
			var osname=plus.os.name;
			var apptype = osname=='iOS'?2:1;
			console.log(osname,apptype)
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
				// console.log(widgetInfo.version,apptype)
			    uni.request({  
			        url: domain+'/api/default/check_update',  
			        data: {  
			            version_number: widgetInfo.version,  
			            type:apptype
			        }, 
			        success: (result) => {  
						var res=result.data;
						console.log(JSON.stringify(res))
						 if(res.code==1){
							let resData=res.data;
							console.log(resData)
							if(resData.update&&resData.download_url){
								console.log(11111111111111)
								// 大包更新
								if(osname=='Android'){
									uni.showModal({
									    title: '更新提示',
										// showCancel:false,
									    content: res.msg ? res.msg: '是否选择整包更新?',
									    success: (showResult) => {
									        if (showResult.confirm) {
												uni.showLoading({
													title:'APP整包更新中'
												}) 
									            // plus.runtime.openURL(openUrl);
												uni.downloadFile({
												    url: resData.download_url,  
												    success: (downloadResult) => { 
														console.log(downloadResult);
												        if (downloadResult.statusCode === 200) { 
												            plus.runtime.install(downloadResult.tempFilePath, {  
												                force: true  
												            }, function() {  
																uni.hideLoading();
												                plus.runtime.restart();  
												            }, function(e) { 
																uni.hideLoading();
												                uni.showToast({
												                    title: '整包更新失败',
												                    duration: 2000
												                }); 
												            });  
												        }  
												    }  
												}); 
									        }
									    }
									})
								}else{
									uni.showModal({
										title:'IOS更新提示',
										content:'APP变动，请及时更新',
										success: (showResult) => {
										    if (showResult.confirm) {
												plus.runtime.openURL(resData.download_url);
											}
										}
									})
								}
							}
							if (resData.update && resData.wgt_url) {
								console.log(2222222222)
								// 小包提醒用户更新
								uni.showModal({
								    title: '更新提示',
									// showCancel:false,
								    content: res.msg ? res.msg : '是否选择更新?',
								    success: (showResult) => {
								        if (showResult.confirm) {
											uni.showLoading({
												title:'APP更新中'
											}) 
								            // plus.runtime.openURL(openUrl);
											uni.downloadFile({
											    url: resData.wgt_url ||resData.pkg_url,  
											    success: (downloadResult) => { 
													console.log(downloadResult);
											        if (downloadResult.statusCode === 200) { 
											            plus.runtime.install(downloadResult.tempFilePath, {  
											                force: true  
											            }, function() {  
															uni.hideLoading();
											                plus.runtime.restart();  
											            }, function(e) { 
															uni.hideLoading();
											                uni.showToast({
											                    title: '更新失败',
											                    duration: 2000
											                }); 
											            });  
											        }  
											    }  
											}); 
								        }
								    }
								})
							}  
						}
			            
			        }  
			    });  
			});  
			// #endif  
		},
		onShow: function() {
			console.log('App Show')
			var ui=uni.getStorageSync('theme') || 'dark'
			this.setTheme(ui);
		},
		onHide: function() {
			console.log('App Hide')
		},
	
		methods:{
			setTheme(ui){
				console.log(ui);
				this.$store.dispatch("changeTheme",ui);
			}
		}
	}
</script>
<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url('./common/common.css');
	@import url("./common/common_light.css");
	page{
		/* background: #061623 ; */
	}
	
	.status_bar {  
		height: var(--status-bar-height);  
		width: 100%;  
		background-color: #102030;
	} 
	.top_view {  
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #102030;  
		top: 0;  
		z-index: 999;
	} 
	
	view{
		box-sizing: border-box!important;
	}
	uni-view{
		box-sizing: border-box;
		font-size: 24upx;
		line-height: 1.2;
	}
	.uni-padding-wrap{
		width: 100%;
	}
	.uni-toast{
		z-index: 10000!important;
	}
	.uni-modal__btn{
		color: red!important;
	}
</style>
