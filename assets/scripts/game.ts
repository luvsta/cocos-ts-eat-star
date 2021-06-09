// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import Player from './player'
import Star from './star'

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(Player)
    player: Player = null;

    // 星星产生后消失时间的随机范围
    maxStarDuration: number = 0
    minStarDuration: number = 0

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 获取水平面，后续生成的星星高度不能低于此
        this.groundY = this.ground.y + this.ground.height / 2;

        // 初始化星星
        this.spawnNewStar();
    }

    spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        // 保存星星组件的引用
        // 在星星脚本组件上保存 Game 对象的引用
        newStar.getComponent('star').game = this;
    }

    // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    getNewStarPosition() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight - 100;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    }

    start() {

    }

    // update (dt) {}
}
