export class Spinner {
    interval: number = 0
    frames: string[] = []
}

export class SpinnerList {
    dot: Spinner = {
        "interval": 80,
        "frames": [
            "⠋",
            "⠙",
            "⠹",
            "⠸",
            "⠼",
            "⠴",
            "⠦",
            "⠧",
            "⠇",
            "⠏"
        ]
    }
    line: Spinner = {
        "interval": 130,
        "frames": [
            "-",
            "\\",
            "|",
            "/"
        ]
    }
}


export const spinners: SpinnerList = new SpinnerList()
