import type {App} from 'vue';
import {useUserInfo} from "@/stores/modules/userInfo.ts";


/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
// 注册自定义指令
export const authDirective = (app: App<Element>) => {
	// 单个权限验证（v-auth="xxx"）
	// 注册自定义指令（对象形式的指令）
	app.directive('auth', {
		mounted(el, binding) {
			const stores = useUserInfo();
			// 权限验证，如果没有权限，则移除该元素
			if (!stores.userInfos.authBtnList.some((v: string) => v === binding.value)) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	// 注册自定义指令（函数形式的指令），简化形式。推荐使用
	app.directive('auths', (el, binding) => {
		// 这会在 `mounted` 和 `updated` 时都调用，不用显示的调用mounted或者updated钩子函数
		let flag = false;
		const stores = useUserInfo();
		stores.userInfos.authBtnList.map((val: string) => {
			binding.value.map((v: string) => {
				if (val === v) flag = true;
			});
		});
		if (!flag) el.parentNode.removeChild(el);
	});
	// 示例： <div v-color="{ color: 'white', text: 'hello!' }">这是一个自定义指令示例</div>
	// 注册自定义指令（函数形式的指令），简化形式。推荐使用
	app.directive('color', (el, binding) => {
		// 这会在 `mounted` 和 `updated` 时都调用，不用显示的调用mounted或者updated钩子函数
		el.style.color = binding.value; // 设置元素的颜色为指令的值
		console.log(binding.value.color) // => "red"
		console.log(binding.value.text) // => "hello!"
	})
}

// <el-button v-auth="'sys_client_add'" @click="formDialogRef.openDialog()" class="ml10" icon="folder-add" type="primary">
// 	{{ $t('common.addBtn') }}
// </el-button>