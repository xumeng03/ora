import fs from "node:fs";

export const withSpace = (...args: any[]) => {
    return args.join(" ")
}

export const readJSON = (url: string) => {
    return JSON.parse(fs.readFileSync(url, 'utf8'))
};
