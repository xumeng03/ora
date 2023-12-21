# Ora

easily use spinner in terminal.

## Install

```sh
npm install @xumeng03/ora
```

## Usage

```typescript
import ora from '@xumeng03/ora';

async function fn1() {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve("aaaa")
            // reject("Fn Fail!")
        }, 2000)
    });
}
async function fn2() {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            // resolve("aaaa")
            reject("Fn Fail!")
        }, 2000)
    });
}

async function test() {
    await oraPromise(fn1, new ORAOption())
    await oraPromise(fn2, new ORAOption())
}

test().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
```

## References

- https://github.com/sindresorhus/ora
- https://juejin.cn/post/7056656772446027784
- https://juejin.cn/post/7055688184264556557
