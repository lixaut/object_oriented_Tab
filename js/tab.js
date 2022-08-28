
var that
class Tab {
    constructor(id) {
        that = this
        // 获取元素
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        // li的父元素
        this.ul = this.main.querySelector('.nav ul:first-child')
        // section的父元素
        this.tabscon = this.main.querySelector('.tabscon')
        this.init()
    }

    // init 初始化操作让相关的元素绑定事件
    init() {
        this.updateNode()
        this.add.onclick = this.addTab
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.removes[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab1
        }
    }

    // 获取所有li、action和关闭按钮
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.removes = this.main.querySelectorAll('.icon')
        this.spans = this.main.querySelectorAll('.nav li span:first-child')
    }

    // 1. 切换功能
    toggleTab() {
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }

    // 2. 添加功能
    addTab() {
        that.clearClass()
        // 2-1. 创建li元素和section元素
        var li = 
        `
        <li class="liactive">
            <span class="title">新选项卡</span><span class="icon">x</span>
        </li>
        `
        var section = `<section class="conactive">新内容</section>`
        // 2-2. 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li)
        that.tabscon.insertAdjacentHTML('beforeend', section)
        that.init()
    }

    // 3. 删除功能
    removeTab(e) {
        // 阻止冒泡
        e.stopPropagation()
        var index = this.parentNode.index
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        if (document.querySelector('.liactive')) return
        index--
        that.lis[index] && that.lis[index].click()
    }

    // 4. 修改功能
    editTab() {
        var str = this.innerHTML
        this.innerHTML = `<input type="text" />`
        var input = this.children[0]
        input.value = str
        // 文本框文字处于选中状态
        input.select()
        // 离开文本框
        input.onblur = function() {
            this.parentNode.innerHTML = this.value
        }
        // 按下回车
        input.onkeyup = function(e) {
            if(e.keyCode == 13) {
                this.blur()
            }
        }
    }
    editTab1() {
        var str = this.innerHTML
        this.innerHTML = `<textarea cols="30" rows="10">${str}</textarea>`
        var textarea = this.children[0]
        textarea.select()
        textarea.onblur = function() {
            this.parentNode.innerHTML = this.value
        }
        textarea.onkeyup = function(e) {
            if(e.keyCode == 13) {
                this.blur()
            }
        }
    }

    // 5. 清除类功能
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
}

new Tab('#tab')