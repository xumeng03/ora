import Cursor from "./cursor";
import chalk from "@xumeng03/chalk";
import {withSpace} from "./utils";
import {Spinner, spinners} from "./spinners";

export class ORAOption {
    color: string = "#333333"
    stream: NodeJS.WriteStream & { fd: 2 } = process.stderr
    spinner: Spinner = spinners["dot"]
    data: string = "Ora Data"
    successData: string = 'Ora Run Success!'
    failData: string = 'Ora Run Fail!'
}

export class ORA {
    id: NodeJS.Timeout | null = null
    index: number = 0
    cursor: Cursor = new Cursor()
    color: string
    stream: NodeJS.WriteStream & { fd: 2 }
    spinner: Spinner
    data: string
    successData: string
    failData: string

    constructor(option: ORAOption) {
        // 提取 option 数据
        this.color = option.color
        this.stream = option.stream
        this.spinner = option.spinner
        this.data = option.data
        this.successData = option.successData
        this.failData = option.failData
    }

    frame() {
        const frame = this.spinner.frames[this.index]
        this.index = ++this.index % this.spinner.frames.length
        return withSpace(frame, this.data)
    }

    clear() {
        // 清除当前行
        this.stream.clearLine(1);
        // 移动光标到0处
        this.stream.cursorTo(0);
    }

    render() {
        // 清除上次渲染结果
        this.clear()
        // 渲染本次结果
        this.stream.write(this.frame());
    }

    start() {
        // 隐藏光标
        this.cursor.hide()
        // 渲染数据
        this.render();
        // 开始渲染数据
        this.id = setInterval(this.render.bind(this), this.spinner.interval);
        // 返回本身
        return this
    }

    stop() {
        // 如果没有定时器标识，直接返回
        if (!this.id) {
            // 返回本身
            return this
        }
        // 清除定时器
        clearInterval(this.id);
        // 清除数据
        this.clear()
        // 重置 frame 索引
        this.index = 0
        // 恢复光标
        this.cursor.show()
        // 返回本身
        return this
    }

    stopAndPersist(text: string) {
        // 停止动画
        this.stop();
        // 渲染后续数据
        this.stream.write(text);
        // 返回本身
        return this
    }

    success(text: string) {
        // 添加 success 图标，渲染数据
        return this.stopAndPersist(chalk.color("green", withSpace("✔", text, "\n")));
    }

    fail(text: string) {
        // 添加 fail 图标，渲染数据
        return this.stopAndPersist(chalk.color("red", withSpace("✖", text, "\n")));
    }
}

export default async function oraPromise(action: Function | Promise<any>, option: ORAOption) {
    // 初始化 ora 实例，并开始动画
    const ora = new ORA(option).start();
    // 结束动画，并根据结果分发
    try {
        const result = await (typeof action == "function" ? action() : action)
        ora.success(option.successData);
        return result
    } catch (error) {
        ora.fail(option.failData);
        throw error;
    }
}


// async function fn1() {
//     return new Promise<any>((resolve, reject) => {
//         setTimeout(() => {
//             resolve("aaaa")
//             // reject("Fn Fail!")
//         }, 2000)
//     });
// }
// async function fn2() {
//     return new Promise<any>((resolve, reject) => {
//         setTimeout(() => {
//             // resolve("aaaa")
//             reject("Fn Fail!")
//         }, 2000)
//     });
// }
//
// async function test() {
//     await oraPromise(fn1, new ORAOption())
//     await oraPromise(fn2, new ORAOption())
// }
//
// test().then(() => process.exit(0)).catch((error) => {
//     console.error(error);
//     process.exit(1);
// });
