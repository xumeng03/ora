import process from 'node:process';

export default class Cursor {
    show() {
        // 开始接收输入
        process.stdin.resume();
        // 显示光标
        process.stdout.write('\u001B[?25h');
    }

    hide() {
        // 停止接收输入
        process.stdin.pause()
        // 隐藏光标
        process.stdout.write('\u001B[?25l');
    }
}
