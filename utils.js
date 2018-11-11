(function(exports) {
	var utils = {
		/*
		*@des 数组去重
		*param arr 数组
		*/
		deduplication: function(arr){
			var obj = {},
				newArr = []
			if(!(arr instanceof Array) || !arr.length){
				return
			}
			for(var i = 0; i<arr.length; i++){
				if(!obj[arr[i]]){
					newArr.push(arr[i])
				}
				obj[arr[i]] = true
			}
			return newArr
		},
		/*
		*@des 数组排序
		*param arr 数组
		*/
		sort: function(arr){
			var newArr = []
			if(!(arr instanceof Array) || !arr.length){
				return
			}
			for(var i = 0; i<arr.length - 1; i++){
				for(var j = i + 1; j<arr.length; j++){
					var tempi = arr[i],
						tempj = arr[j];
					if(tempi > tempj){
						arr[i] = tempj;
						arr[j] = tempi
					}
				}
			}
			return arr
		},
		/*
		*@des 获取DOM
		*param id domID
		*param target dom节点
		*/
		$: function(id, target){
			return target ? document.getElementById(id).getElementsByTagName(target) : document.getElementById(id)
		},
		/*
		*@des 绑定监听事件
		* parsm el DOM节点 type 事件类型 fn 方法
		*/
		addEvent: function(el, type, fn){
			if(el.addEventListener){
				el.addEventListener(type, fn)
			}else{
				el.attachEvent('on' + type, fn)
			}
		},
		/*
		*@des 解除绑定的事件
		*param el DOM节点 type 事件类型, 绑定的函数
		*/
		removeEvent: function(el, type, fn){
			if(el.removeEventListener){
				el.removeEventListener(type, fn)
			}else{
				el.detachEvent('on' + type, fn)
			}
		},
		/*
		*@des 获取URL后面的参数
		*param url 地址
		*/
		getParams: function(url){ // https://www.imooc.com/article/18247 例子
			var obj = {},arr = []
			console.log(url)
			if(typeof url !== 'string' || url.indexOf('?') < 0){
				return
			}
			arr = decodeURIComponent(url).split('?')[1].split('&')
			for(var i = 0; i < arr.length; i++){
				var key = arr[i].split('=')[0],
					val = arr[i].split('=')[1] || true;
				if(!obj[key]){
					obj[key] = val
				}else{
					obj[key] = [obj[key], val]
				}
			}
			return obj
		},
		/*
		@des call 实现bind 函数
		*fn 运行环境 context 绑定上下文
		*/
		bind: function(fn, context) {
			var index = arguments.length, arr = [];
			for(var i = 0; i<index; i++){
				arr.push(arguments[i])
			}
			arr = arr.splice(0,2)
			return function(){
				fn.call(context, arr.split(''))
			}
		},
		/*
		@des 获取字符串数组 相同的字符，没有返回空
		* arr 字符串数组
		*/
		getMaxString: function(arr){
			var len = arr.length,
				newArr = [],
				obj = {},
				outStr = [];
			if(!(arr instanceof Array) || !arr.length){
				return
			}
			// stArr = arr.toLocaleString().replace(/\,/g, '')
			newArr = arr.join('').split('')
			for(var j = 0; j<newArr.length; j++){
				if(!obj[newArr[j]]){
					obj[newArr[j]] = 0;
				}
				obj[newArr[j]]++
			}
			for(key in obj){
				if(obj[key] == len){
					outStr.push(key)
				}
			}
			return outStr.join('').toLowerCase()
		},
		/*
		@des 获取重复次数最多的数组
		*params arr数组
		*/
		getLongStr: function(arr){
			var len = arr.length,
				m = 0,
				str,
				obj = {}
			if(!arr instanceof Array || !arr.length){
				return
			}
			for(var i = 0; i<len; i++){
				if(!obj[arr[i]]){
					obj[arr[i]] = 1
				}else{
					obj[arr[i]]++
				}
				if(obj[arr[i]] >= m){
					m = obj[arr[i]]
					str = arr[i]
				}
			}
			return str
			console.log(obj)
		},
		/*
		* @des 多维数组转成一维数组
		* arr 数组
		*/
		unid: function(arr){
			var newArr = []
			if(!arr instanceof Array){
				return
			}
			// 1,使用数组map()方法，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
			// var arr1 = (arr + '').split(',');
			// var newArr = arr1.map(function(item){
			// 	return Number(item)
			// })
			// 2,递归
			var fun = function(arr){
				for(var i = 0; i<arr.length; i++){
					if(Array.isArray(arr[i])){
						fun(arr[i])
					}else{
						newArr.push(arr[i])
					}
				}
			}
			fun(arr)
			return newArr
		},
		/*
		* @des 对象深复制
		* obj 深复制的对象
		* https://github.com/junhey/junhey.github.io/issues/2
		*/
		deepCopy: function(obj){
			var newObj = obj.constructor === Array ? [] : {};
			newObj.constructor = obj.constructor;
			if(typeof obj !== 'object'){
				return;
			}else{
				for(var key in obj){
					if(typeof obj[key] === 'object'){
						newObj[key] = utils.deepCopy(obj[key]); // 递归
					}else{
						newObj[key] = obj[key];
					}
				}
			}
			return newObj
		},
		/*
		*私有属性(方法)，实例属性(方法)，类属性(方法)
		*/
		Person: function(name,age){
			// var person1 = new Person('aa', 30);
			// Person.prototype.set = function(){
				// console.log('sd')
			//} 类方法
			var name = name; // 私有属性
			this.age = age; // 实例属性
			var sayHI = function(){ // 私有方法
				alert('hi');
			}
			this.getName = function() { // 实例方法
				return name; // 返回私有属性
			}
			this.sayHello = sayHI;
		}
	}
	exports.utils = utils
})(window)
new code
