// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    jumpHeight: number = 0;

    @property
    jumpDuration: number = 0;

    @property
    maxMoveSpeed: number = 0;

    @property
    accel: number = 0;

    // 辅助形变动作时间
    @property
    squashDuration: number = 0;


    accLeft: Boolean = false
    accRight: Boolean = false
    xSpeed: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        var jumpAction = this.runJumpAction();
        cc.tween(this.node).then(jumpAction).start()
        // 主角当前水平方向速度
        this.xSpeed = 0;


        this.initKeyboardInput()
    }
    start() {

    }

    update (dt) {
        console.log(dt);
    }

    // 跳跃
    runJumpAction() {
        // 跳跃上升
        var jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' });
        // 下落
        var jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' });
        // 形变
        var squash = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 0.6 });
        var stretch = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1.2 });
        var scaleBack = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1 });

        // 创建一个缓动
        var tween = cc.tween()
            // 按顺序执行动作
            .sequence(squash, stretch, jumpUp, scaleBack, jumpDown)
        // 添加一个回调函数，在前面的动作都结束时调用我们定义的 playJumpSound() 方法

        // 不断重复
        return cc.tween().repeatForever(tween);
    }

    onKeyDown(event) {
        console.error(event);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    }

    // 初始化键盘输入
    initKeyboardInput() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
}
